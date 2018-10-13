/* ============
 * Mutations for the form module
 * ============
 *
 * The mutations that are available on the
 * form module.
 */

import { SET_FORM_DATA } from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
  [SET_FORM_DATA] (state, { byTokenForm, recipientForm }) {
    state.byTokenForm = byTokenForm
    state.recipientForm = recipientForm
  }
}
