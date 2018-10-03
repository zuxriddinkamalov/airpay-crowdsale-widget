/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { SET_AIRPAY_DATA } from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
  [SET_AIRPAY_DATA] (state, { settings, loading, hash, byTokenData }) {
    state.settings = settings
    state.loading = loading
    state.hash = hash
    state.byTokenData = byTokenData
  }
}
