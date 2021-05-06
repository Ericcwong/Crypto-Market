<template>
  <b-dropdown-item @click.prevent="googleSignup">
    Continue with: &nbsp;
    <img class="google-icon" src="search.png" alt="Google Icon" />
  </b-dropdown-item>
</template>

<script>
import firebase from 'firebase/app'
export default {
  name: 'GoogleSignIn',
  methods: {
    googleSignup() {
      var provider = new firebase.auth.GoogleAuthProvider()
      this.$fire.auth
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken
          console.log(token)
          // The signed-in user info.
          var user = result.user
          console.log(user)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          // ...
        })
    },
  },
}
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
}
.google-icon {
  width: 17px;
}
</style>