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
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
// import { onError } from 'apollo-link-error'

import { API_URL } from '@/constant/api'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: API_URL
})

/* const checkError = onError(({ graphQLErrors, networkError }) => {
  // window.location.reload()
  console.warn(networkError)
}) */

const authLink = setContext((_, { headers }) => {
  // get the authentication token from session storage if it exists
  const token = sessionStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || ''
    }
  }
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
