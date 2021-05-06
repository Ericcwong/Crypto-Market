const actions = {
    logoutUser(){
        this.$fire.auth.signOut().then(() => {
            // Sign-out successful.
            console.log("User Signed out")
            this.$router.push("/")
          }).catch((error) => {
            // An error happened.
            console.log("Sign out Error: " + error)
          });
    }
}

export default actions