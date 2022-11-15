import { logger } from "$api/src/lib/logger";
import { initDiaspora } from "$api/src/services/diaspora/diaspora";
import { Issuer, BaseClient, generators } from 'openid-client';
import { fetch } from "cross-undici-fetch";

//Pas possible de mettre une constante, parce qu'au chargement du script, dotenv n'a pas encore chargé les variables d'env
// et donc BASE_URL est undefined.
const getCallbackUrl = () => `${process.env.BASE_URL}/diaspora/callback`;

/**
 * Récupération des credientals auprès de l'instance Diaspora.
 * A renseigner dans les variables d'environnement :
 *  - DIASPORA_CLIENT_ID
 *  - DIASPORA_CLIENT_SECRET
 */
export default () => {
  logger.level = "info";
  //Si aucune URL de diaspora, exit
  if (!process.env.DIASPORA_URL) {
    logger.error("Aucune adresse d'instance Diaspora déclaré dans les variables d'environnement, impossible d'obtenir les credentials (secret, client_id) auprès de l'instance.")
    return
  }

  //Si aucun credentials, on va les chercher
  if (!process.env.DIASPORA_CLIENT_ID && !process.env.DIASPORA_CLIENT_SECRET)
    //https://github.com/panva/node-openid-client#quick-start
    Issuer.discover(process.env.DIASPORA_URL)
      .then(function (diasporaIssuer) {
        logger.debug({ custom: diasporaIssuer.registration_endpoint }, 'Discovered issuer registration endpoint');

        //Impossible d'utiliser diasporaIssuer.Client.register({ client_name: "ctp", redirect_uris: [getCallbackUrl()] })
        //=> {"error":"expected 201 Created, got: 200 OK","name":"OPError"}
        //@ts-ignore URL
        fetch(diasporaIssuer.registration_endpoint,
          {
            method: "POST",
            headers: { Accept: 'application/json', "Content-Type" : "application/json" },
            body: JSON.stringify({
              client_name: "ctp",
              redirect_uris: [getCallbackUrl()]
            })
          })
        .then(function (response) {
          //Deserialisation en JSON
          response.json().then(json => {
            //{"id":10,"user_id":null,"client_id":"XXX","client_secret":"XXX","client_name":"ctp","redirect_uris":["http://localhost:8910/diaspora/callback"],"response_types":null,"grant_types":null,"application_type":"web","contacts":null,"logo_uri":null,"client_uri":null,"policy_uri":null,"tos_uri":null,"sector_identifier_uri":null,"token_endpoint_auth_method":"client_secret_post","jwks":null,"jwks_uri":null,"ppid":false,"created_at":"2022-11-15T15:51:03.573Z","updated_at":"2022-11-15T15:51:03.573Z","client_secret_expires_at":0}
            logger.debug({ custom: json }, 'Registration OK');
            logger.info({custom: {
              DIASPORA_CLIENT_SECRET: json.client_secret,
              DIASPORA_CLIENT_ID: json.client_id,
            }}, "Enregistrement OK. Entrez ces valeurs dans votre fichier .env pour connecter votre instance.")

          })
        })
        .catch(err => logger.error({ custom: err }, 'Registration failed'))
        //next();
      })
      .catch(err => logger.error({ custom: err }, 'Discover issuer failed'))
  else
    logger.warn("Credentials déjà renseigné dans les variables d'environnement : supprimez-les et éxecutez à nouveau ce script pour en générer des nouveaux.")

  return
  //next();
}
/**
 * {
    "claim_types_supported": [
      "normal"
    ],
    "claims_parameter_supported": true,
    "grant_types_supported": [
      "authorization_code",
      "implicit"
    ],
    "request_parameter_supported": true,
    "request_uri_parameter_supported": true,
    "require_request_uri_registration": false,
    "response_modes_supported": [
      "query",
      "fragment"
    ],
    "token_endpoint_auth_methods_supported": [
      "client_secret_basic",
      "client_secret_post",
      "private_key_jwt"
    ],
    "issuer": "https://pc-diaspora-dev.cartotalents.com/",
    "authorization_endpoint": "https://pc-diaspora-dev.cartotalents.com/api/openid_connect/authorizations/new",
    "jwks_uri": "https://pc-diaspora-dev.cartotalents.com/api/openid_connect/jwks.json",
    "response_types_supported": [
      "id_token",
      "id_token token",
      "code"
    ],
    "subject_types_supported": [
      "public",
      "pairwise"
    ],
    "id_token_signing_alg_values_supported": [
      "RS256"
    ],
    "token_endpoint": "https://pc-diaspora-dev.cartotalents.com/api/openid_connect/access_tokens",
    "userinfo_endpoint": "https://pc-diaspora-dev.cartotalents.com/api/openid_connect/user_info",
    "registration_endpoint": "https://pc-diaspora-dev.cartotalents.com/api/openid_connect/clients",
    "scopes_supported": [
      "contacts:modify",
      "contacts:read",
      "conversations",
      "email",
      "interactions",
      "name",
      "nickname",
      "notifications",
      "openid",
      "picture",
      "private:modify",
      "private:read",
      "profile",
      "profile:modify",
      "profile:read_private",
      "public:modify",
      "public:read",
      "sub",
      "tags:modify",
      "tags:read"
    ],
    "userinfo_signing_alg_values_supported": [
      "none"
    ],
    "request_object_signing_alg_values_supported": [
      "none"
    ],
    "claims_supported": [
      "sub",
      "name",
      "nickname",
      "profile",
      "picture"
    ]
  }
 */
