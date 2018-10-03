/* ============
 * Mutations for the general state
 * ============
 *
 * The mutations that are available on the
 * general state.
 */

import { SET_GENERAL_DATA } from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
  [SET_GENERAL_DATA] (state, component) {
    state.component = component
  }
}
