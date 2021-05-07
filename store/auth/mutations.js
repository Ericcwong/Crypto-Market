const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION:(state, {authUser}) =>{
      if(!authUser){
        state.user = null
      }else{
        const { email, uid, displayName, photoURL} = authUser
        state.user = { email, uid, displayName, photoURL}
        
      }
    },

    
}

export default mutations