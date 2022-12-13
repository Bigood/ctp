export const schema = gql`
  type DiasporaProfile {
    id: String!
    name: String!
    bio: String
    carto_etablissement: String
    carto_longitude: String
    carto_latitude: String
    show_profile_info: Boolean
    carto_id: String
    carto_technics: JSON
    carto_methods: JSON
    carto_activites: JSON
    carto_user_type: String
  }
  input DiasporaProfileInput {
    name: String
    bio: String
    carto_etablissement: String
    carto_longitude: String
    carto_latitude: String
    show_profile_info: Boolean
    carto_id: String
    carto_technics: JSON
    carto_methods: JSON
    carto_activites: JSON
    carto_user_type: String
  }

  type Query {
    getAllDiasporaProfiles: [DiasporaProfile]! @skipAuth
  }
  type Mutation {
    createDiasporaProfile(profile: DiasporaProfileInput): Boolean
    updateDiasporaProfile(profile: DiasporaProfileInput): Boolean
  }
`
