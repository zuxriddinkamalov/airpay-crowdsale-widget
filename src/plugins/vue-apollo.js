/* ============
 * Vue Apollo
 * ============
 *
 * GraphQL is a specification that aims at easing the communication between frontends and backends
 *
 * https://akryum.github.io/vue-apollo/guide/apollo/
 */

import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { createUploadLink } from 'apollo-upload-client'
import { onError } from 'apollo-link-error'
import { ApolloLink, from } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import Store from '@/store'
import { API_URL, API_WS_URL } from '@/constant/api'

const token = sessionStorage.getItem('token')

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) =>
      kind === 'OperationDefinition' && operation === 'subscription'
  )

const client = new SubscriptionClient(API_WS_URL, {
  reconnect: true,
  connectionCallback: function (error, result) {
    if (error) {
      Store.dispatch('graphQLError', error)
    }
  }
})

const wsLink = new WebSocketLink(client)

// eslint-disable-next-line
const httpLink = new createUploadLink({
  uri: API_URL
})

const checkError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    Store.dispatch('graphQLError', graphQLErrors)
  }
  if (networkError) {
    Store.dispatch('networkError', networkError)
  }
})

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token || ''
    }
  }))

  return forward(operation)
})
const links = ApolloLink.split(hasSubscriptionOperation, wsLink, httpLink)
// Create the apollo client
const apolloClient = new ApolloClient({
  link: from([checkError, authLink, links]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
