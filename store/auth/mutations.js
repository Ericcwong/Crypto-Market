const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION:(state, {authUser}) =>{
      if(!authUser){
        state.user = null
      }else{
        const { email, uid, displayName} = authUser
        state.user = { email, uid, displayName}
        
      }
    },

    
}

export default mutations