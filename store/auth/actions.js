import firebase from 'firebase/app'

const actions = {
  logoutUser() {
    this.$fire.auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log('User Signed out')
        this.$router.push('/')
      })
      .catch((error) => {
        // An error happened.
        console.log('Sign out Error: ' + error)
      })
  },
  googleSignup() {
    let provider = new firebase.auth.GoogleAuthProvider()
    this.$fire.auth
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        let credential = result.credential
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = credential.accessToken
        console.log(token)
        // The signed-in user info.
        let user = result.user
        console.log(user)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code
        let errorMessage = error.message
        // The email of the user's account used.
        let email = error.email
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential
        // ...
      })
  },
}

export default actions
