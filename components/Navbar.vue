<template>
  <v-app-bar :clipped-left="clipped" fixed>
    <v-app-bar-title>Crypto Wallet Tracker</v-app-bar-title>
    <v-spacer></v-spacer>
    <GoogleSignIn />
  </v-app-bar>
</template>

<script>
import GoogleSignIn from './Auth/GoogleSignIn'
export default {
  components: {
    GoogleSignIn,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
    }
  },
}
</script>

<style scoped>
.google-icon {
  width: 30px;
}
</style>