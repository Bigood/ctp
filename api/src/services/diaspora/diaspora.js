'use strict';

import { logger } from "src/lib/logger";
import { fetch } from "cross-undici-fetch";
import { Issuer, generators } from 'openid-client';

const SCOPES = "openid profile email public:read private:read private:modify  contacts:read profile:modify";

/*********************************************
 ******************* Helpers *****************
 *********************************************/

//Pas possible de mettre une constante, parce qu'au chargement du script, dotenv n'a pas encore chargé les variables d'env
// et donc BASE_URL est undefined.
const getCallbackUrl = () => `${process.env.BASE_URL}/diaspora/callback`;
const generateHeaders = (req) => {
  let headers = {
    "Cache-Control": "no-cache",
    "Accept": "*/*",
    // "Accept-Encoding": "gzip, deflate, br",
    // "Connection": "keep-alive",
    "Content-Type": "application/json",
  }
  if (req && req.session && req.session.diaspora_access_token)
    headers["Authorization"] = `Bearer ${req.session.diaspora_access_token}`;

  return headers;
};

export const isDiasporaConnected = () => typeof process.env.DIASPORA_URL == "string";
export const isDiasporaLoggedIn = (req) => {
  return typeof req.session.diaspora_access_token == "string" && typeof req.session.diaspora_refresh_token == "string"
}
/*********************************************
 ******************** Init *******************
 *********************************************/

export const initDiaspora = (req, res, next) => {
  //Si aucune conf
  if (!process.env.DIASPORA_URL)
    return
  //next()

  //Déjà un client
  if (global.diasporaClient) {
    logger.debug("global.diasporaClient déjà set")
    return
    //next();
  }

  if (process.env.DIASPORA_CLIENT_ID && process.env.DIASPORA_CLIENT_SECRET)
    //https://github.com/panva/node-openid-client#quick-start
    Issuer.discover(process.env.DIASPORA_URL)
      .then(function (diasporaIssuer) {
        logger.debug('Discovered issuer %s %O', diasporaIssuer.issuer, diasporaIssuer.metadata);
        const client = new diasporaIssuer.Client({
          client_id: process.env.DIASPORA_CLIENT_ID,
          client_secret: process.env.DIASPORA_CLIENT_SECRET,
          redirect_uris: [getCallbackUrl()],
          response_types: ['code'],
          // id_token_signed_response_alg (default "RS256")
          // token_endpoint_auth_method (default "client_secret_basic")

        }); // => Client
        global.diasporaClient = client;

        //next();
      })
      .catch(err => logger.debug('Discover issuer failed', err))

  return
  //next();
}

/*********************************************
 ******************* Routes ******************
 *********************************************/

export const getAllDiasporaProfiles = (req, res, next) => {
  return fetch(`${process.env.DIASPORA_URL}/api/v1/users`);
}

/**
 * POST /api/v1/user with profile and user infos
 * @param {object} body req.body raw
 * @param {string} user_type "user"|"pedago"|"structure"
 * @param {string} id ID
 * @returns
 */
export const createDiasporaProfile = ({body, user_type = "user", id}) => {
  debugger
  const profile = {
    name: body.name, // "Michel Blanc"
    bio: body.free_description, // Biographie libre
    carto_etablissement: body.organization, // "Ecole des mines de Nantes"
    carto_longitude: body.longitude, // "-1.52049"
    carto_latitude: body.latitude, // "47.2821"
    show_profile_info: true, // "true"
    carto_id: id,
    carto_technics: 2,
    carto_user_type: user_type, // "pedago"
  }
  return fetch(
    `${process.env.DIASPORA_URL}/api/v1/user`,
    {
      method: "POST",
      headers: generateHeaders(),
      body: JSON.stringify({
        //Info User
        // Maen Jgnkl => maen_jgnkl (Api::V1::UsersController: Validation failed: Username is invalid. We only allow letters, numbers, and underscores
        //https://stackoverflow.com/a/37511463/1437016
        //chc-unit spécial'homme 23 çava! -> chc_unit_special_homme_23_cava_
        username: body.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w]/g, "_").toLowerCase(),
        email: body.email.toLowerCase(),
        password: body.password,
        password_confirmation: body.password,
        // language: "fr",

        //Infos Profile dans Person pour création user diaspora
        person: profile,
        ...profile
      })
    },
  )
  .then(res => res.text())
  .then(text => { logger.debug({ custom: { text: text, data: body } }, "Diaspora create user") })
  .catch(error => { logger.error({ custom: { error } }, "Diaspora create user") })
}


/**
 * PATCH /api/v1/user with profile
 * @param {object} req req raw
 * @param {object} body req.body raw
 * @param {string} user_type "user"|"pedago"|"structure"
 * @param {string} id ID mongodb
 * @returns
 */
export const updateDiasporaProfile = ({req, body, user_type = "user", id}) => {
  fetch(
    `${process.env.DIASPORA_URL}/api/v1/user`,
    {
      method: "PATCH",
      headers: generateHeaders(req),
      body: JSON.stringify({
        name: body.name, // "Michel Blanc"
        bio: body.free_description, // Biographie libre
        carto_id: id, // "60db36724a51c4bebab72d0d"
        carto_etablissement: body.organization, // "Ecole des mines de Nantes"
        carto_longitude: body.longitude, // "-1.52049"
        carto_latitude: body.latitude, // "47.2821"
        show_profile_info: true, // "true"
        carto_technics: 2,
        carto_user_type: user_type, // "pedago"
      })
    },
    )
  .then(res => res.text())
  .then(text => {logger.debug({custom: {text: text, data : body}}, "Diaspora update user")})
  .catch(error => {logger.error({ custom: { error } }, "Diaspora update user")})
}


/*********************************************
 ******************* Auth ********************
 *********************************************/

export const callback = (req, res, next) => {
  logger.debug(req.headers, req.body, req.session)
  const params = global.diasporaClient.callbackParams(req);

  global.diasporaClient
    .callback(getCallbackUrl(), params, { code_verifier: req.session.diaspora_code_verifier }) // => Promise
    .then(async function (tokenSet) {
      logger.debug('received and validated tokens %j', tokenSet);
      logger.debug('validated ID Token claims %j', tokenSet.claims());
      req.session.diaspora_access_token = tokenSet.access_token;
      req.session.diaspora_refresh_token = tokenSet.refresh_token;
      // await req.session.save();
      res.redirect(process.env.ROOT_URL + '/account');
    });
}

export const loginDiaspora = (req, email, callback) => {
  logger.debug("Login de l'utilisateur ", email);

  const code_verifier = generators.codeVerifier();
  // store the code_verifier in your framework's session mechanism, if it is a cookie based solution
  // it should be httpOnly (not readable by javascript) and encrypted.
  req.session.diaspora_code_verifier = code_verifier
  // await req.session.save();

  const code_challenge = generators.codeChallenge(code_verifier);

  const url = global.diasporaClient.authorizationUrl({
    scope: SCOPES,
    resource: email,
    prompt: "none", //https://auth0.com/docs/authorization/configure-silent-authentication
    code_challenge,
    code_challenge_method: 'S256',
  });
  logger.debug("Url d'autorisation : ", url);
  return url

  // $(".approval-button input.btn-primary[type=submit]").click()
  fetch(url)
    .then(res => res.text())
    .then(text => {
      logger.debug("Retour", text)
      callback(text);
    });
}