/* ============
 * Mutations for the general state
 * ============
 *
 * The mutations that are available on the
 * general state.
 */

import {
  SET_ACTIVE_TAB,
  SET_NETWORK_ERROR_DATA,
  SET_GRAPHQL_ERROR_DATA,
  SET_STEP,
  SET_COLOR
} from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
  [SET_ACTIVE_TAB] (state, component) {
    state.component = component
  },
  [SET_STEP] (state, step) {
    state.step = step
  },
  [SET_COLOR] (state, color) {
    state.color = color
  },
  [SET_NETWORK_ERROR_DATA] (state, error) {
    state.networkError = error
  },
  [SET_GRAPHQL_ERROR_DATA] (state, error) {
    state.graphQLError = error
  }
}
