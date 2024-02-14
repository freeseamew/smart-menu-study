import mutations from './mutations';
import queries from './queries';
// import { GraphQLUpload } from 'graphql-upload';
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: mutations,
  Query: queries,
}

export default resolvers;