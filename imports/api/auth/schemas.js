import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Email {
    address: String
  }

  type Profile {
    role: String
  }

  type User {
    _id: ID
    emails: [Email]
    profile: Profile
  }

  type AuthToken {
    authToken: String
    userId: ID
  }

  extend type Mutation {
    loginWithPassword(email: String, pwd: String): AuthToken
    logout: Boolean
    addUser(email: String, pwd: String): ID
    updateUserRole(_id:ID, role: String): ID
    deleteUser(_id: ID): ID
  }

  extend type Query {
    users: [User]
    me: User
  }
`

export default typeDefs;