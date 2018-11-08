/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { SET_AIRPAY_DATA, SET_AIRPAY_STATE } from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
  [SET_AIRPAY_DATA] (state, { settings, loading, hash, byTokenData, authData, verificationHash }) {
    state.settings = settings
    state.loading = loading
    state.hash = hash
    state.byTokenData = byTokenData
    state.authData = authData
    state.verificationHash = verificationHash
  },
  [SET_AIRPAY_STATE] (state, { key, value = null }) {
    state[key] = value
  }
}
