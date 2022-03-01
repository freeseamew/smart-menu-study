import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebApp } from 'meteor/webapp';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

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

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    onConnect: async(connectionParams, webSocket, context) => {
      console.log(`Subscription clent connected using new SubscriptionServer`);
    },
    onDisconnect: async(webSocket, context) => {
      console.log(`Subscription client disconnected`);
    },
  },    
  {
    server: WebApp.httpServer,
    path: '/graphql'
  });

  const server = new ApolloServer({
    playground: true,
    schema,
    context: '',
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          }
        }
      }
    ]
  });

  await server.start();

  server.applyMiddleware({
    app: WebApp.connectHandlers,
    cors: true,
    path: '/graphql',
  });

})();