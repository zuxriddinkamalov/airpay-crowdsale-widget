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
import { API_URL } from '@/constant/api'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: API_URL
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
