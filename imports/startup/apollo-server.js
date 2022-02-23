import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebApp } from 'meteor/webapp';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import resolverItem from '/imports/api/item/resolvers';
import typeDefsItem from '/imports/api/item/schemas';
import resolverOrder from '/imports/api/order/resolvers';
import typeDefsOrder from '/imports/api/order/schemas';

(async function(){
  const typeDefs = [typeDefsItem, typeDefsOrder];
  const resolvers = [resolverItem, resolverOrder];

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    playground: true, // 오류
    schema,
    context: '',
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
  });

  await server.start();

  server.applyMiddleware({
    app: WebApp.connectHandlers,
    cors: true,
    path: '/graphql',
  });

})();