import mutations from './mutations';
import queries from './queries';
import { GraphQLUpload } from 'graphql-upload';

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: mutations,
  Query: queries,
}

export default resolvers;