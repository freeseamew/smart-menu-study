import { ApolloClient, InMemoryCache, split, defaultDataIdFromObject } from '@apollo/client/core';
import { HttpLink, ApolloLink, from } from '@apollo/client/core';
// import { WebSocketLink } from '@apollo/client/link/ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ALL } from '../../utils/constants';
import { itemPage, authToken } from '/imports/ui/stores';
import { get } from 'svelte/store';
import { createUploadLink } from 'apollo-upload-client';
import Shortid from 'shortid';

// const httpLink = new HttpLink({
//   uri: "http://localhost:3000/graphql",
// });

const uploadLink = createUploadLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin',
})

// const wsLink = new WebSocketLink({
//   uri: "ws://localhost:3000/graphql",
// });

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3000/graphql',
}));

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('Meteor.loginToken');
  
  if(!token) authToken.checkToken();

  operation.setContext(() => {
    return {
      headers: {
        authorization: token ? token : '',
      }
    }
  });
  return forward(operation);
});

const link = split(
  ({query}) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  // httpLink,
  uploadLink,
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        itemsPageCount: {
          keyArgs: false,
        },
        items: {
          keyArgs: ["_id"],
          merge(existing=[], incoming=[], { args, readField }) {
            const newArr = [...existing, ...incoming];
            // const uniqueArr = newArr.filter((arr, index, callback) => index === callback.findIndex(t=> t.__ref === arr.__ref));
            
            let resultArr = [];
            // if(args.itemCategoryId !== ALL) {
            //   resultArr = uniqueArr.filter(_id => readField('itemCategoryId', _id) === args.itemCategoryId);
            // }
            // else {
            //   resultArr = uniqueArr;
            // }

            const itemPageNumber = get(itemPage);
            if(itemPageNumber.pageNumber <=1 ) {
              resultArr = incoming;
            }
            else {
              resultArr = newArr;
            }

            return resultArr;
          }
        }
      }
    }
  },
  dataIdFromObject(responseObject) {
    switch (responseObject.__typename) {
      case 'OrderItem': return `OrderItem:${Shortid.generate()}`;
      default: return defaultDataIdFromObject(responseObject);
    }
  }
});

const client = new ApolloClient({
  // uri: 'http://localhost:3000/graphql',
  link: from ([authLink, link]),
  // cache: new InMemoryCache(),
  cache,
});

export default client;