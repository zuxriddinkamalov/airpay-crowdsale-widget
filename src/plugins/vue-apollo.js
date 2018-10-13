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
import Store from '@/store'

import { API_URL } from '@/constant/api'

const httpLink = new createUploadLink({
  // You should use an absolute URL here
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
  const token = sessionStorage.getItem('token')

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token || ''
    }
  }))

  return forward(operation)
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: from([checkError, authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
