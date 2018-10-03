/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

import Home from '@/views/home/Home.vue'

export default [
  {
    path: '/',
    component: Home
  },

  {
    path: '/*',
    redirect: '/'
  }
]
