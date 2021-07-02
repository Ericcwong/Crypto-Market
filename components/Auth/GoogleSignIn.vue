<template>
  <v-btn>
    <img
      @click.prevent="googleSignup"
      class="google-icon"
      src="search.png"
      alt="Google Icon"
  /></v-btn>
</template>

<script>
export default {
  name: 'GoogleSignIn',
  methods: {
    googleSignup() {
      this.$store.dispatch('auth/googleSignup')
    },
  },
}
</script>

<style scoped>
.google-icon {
  width: 17px;
}
</style>
