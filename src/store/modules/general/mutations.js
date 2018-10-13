/* ============
 * Mutations for the general state
 * ============
 *
 * The mutations that are available on the
 * general state.
 */

import { SET_GENERAL_DATA, SET_NETWORK_ERROR_DATA, SET_GRAPHQL_ERROR_DATA } from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
  [SET_GENERAL_DATA] (state, component) {
    state.component = component
  },
  [SET_NETWORK_ERROR_DATA] (state, error) {
    state.networkError = error
  },
  [SET_GRAPHQL_ERROR_DATA] (state, error) {
    state.graphQLError = error
  }
}
