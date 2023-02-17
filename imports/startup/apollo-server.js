import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebApp } from 'meteor/webapp';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { execute, subscribe } from 'graphql';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import { getUser } from 'meteor/apollo';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';

import resolverItem from '/imports/api/item/resolvers';
import typeDefsItem from '/imports/api/item/schemas';
import resolverOrder from '/imports/api/order/resolvers';
import typeDefsOrder from '/imports/api/order/schemas';
import resolverAuth from '/imports/api/auth/resolvers';
import typeDefsAuth from '/imports/api/auth/schemas';

(async function(){
  const typeDefs = [typeDefsItem, typeDefsOrder, typeDefsAuth];
  const resolvers = [resolverItem, resolverOrder, resolverAuth];

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const wsServer = new WebSocketServer({
    noServer: true,
    path: "/graphql",
  });

  WebApp.httpServer.on('upgrade', (request, socket, head) => {
    if(request.url === '/graphql') {
      return wsServer.handleUpgrade(request, socket, head, done = (ws) => {
        wsServer.emit("connection", ws, request);
      });            
    }
    else {
      return;
    }
  });
  
  const serverCleanup = useServer({schema}, wsServer);    

  // const subscriptionServer = SubscriptionServer.create({
  //   schema,
  //   execute,
  //   subscribe,
  //   onConnect: async(connectionParams, webSocket, context) => {
  //     console.log(`Subscription clent connected using new SubscriptionServer`);
  //   },
  //   onDisconnect: async(webSocket, context) => {
  //     console.log(`Subscription client disconnected`);
  //   },
  // },    
  // {
  //   server: WebApp.httpServer,
  //   path: '/graphql'
  // });

  const server = new ApolloServer({
    playground: true,
    schema,
    // context: async({req}) => {
    //   console.log(`req: ${JSON.stringify(req) }`)
    // },
    context: async ({req}) => ({
      user: await getUser(req.headers.authorization),
      userToken: req.headers.authorization,
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            // async drainServer() {
            //   subscriptionServer.close();
            // }
            async drainServer() {
              await serverCleanup.dispose();
            },            
          }
        }
      }
    ]
  });

  await server.start();

  const app = express();
  app.use(graphqlUploadExpress());
  WebApp.connectHandlers.use('/graphql', app);

  server.applyMiddleware({
    app: WebApp.connectHandlers,
    cors: true,
    path: '/graphql',
  });

})();