/* Whenever the server starts up in Nuxt, checks localstorage if there is a registered user.
 *  If there is, it will pass the information to the middleware/router-guard allowing admin use.
 */


export const actions = {
    async nuxtServerInit({ dispatch, commit, redirect }, { res }) {
      if (res && res.locals && res.locals.user) {
        const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
        commit("auth/ON_AUTH_STATE_CHANGED_MUTATION", { authUser, claims, token })
      }
    },
  }
  