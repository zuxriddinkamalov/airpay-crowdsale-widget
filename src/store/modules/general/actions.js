/* ============
 * Actions for the general module
 * ============
 *
 */

import { SET_NETWORK_ERROR_DATA, SET_GRAPHQL_ERROR_DATA } from './mutation-types'

export const networkError = ({ commit, state }, errorData) => {
  commit(SET_NETWORK_ERROR_DATA, errorData)
}

export const graphQLError = ({ commit, state }, errorData) => {
  commit(SET_GRAPHQL_ERROR_DATA, errorData)
}

export default {
  networkError,
  graphQLError
}
