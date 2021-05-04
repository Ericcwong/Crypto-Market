const mutations = {
    ON_AUTH_STATE_CHANGED_MUTATION:(state, {authUser, claims}) =>{
        if(!authUser){
          state.user = null
        }else{
          const { email, uid } = authUser
          const admin = claims.admin
          state.user = { email, uid, admin }
          
        }
      }
}

export default mutations