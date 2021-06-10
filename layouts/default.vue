<template>
  <v-app class="home-container">
    <Navbar />
    <Nuxt />
  </v-app>
</template>

<script>
import Navbar from '~/components/UI/Navigation/Navbar'
export default {
  components: {
    Navbar,
  },
}
</script>

<style scoped>
.home-container {
  background: hsla(210, 10%, 23%, 1);
  width: 100%;
  /* background: linear-gradient(
    315deg,
    hsla(210, 10%, 23%, 0.7) 0%,
    hsla(210, 10%, 23%, 1) 100%
  );

  background: -moz-linear-gradient(
    315deg,
    hsla(210, 10%, 23%, 0.7) 0%,
    hsla(210, 10%, 23%, 1) 100%
  );

  background: -webkit-linear-gradient(
    315deg,
    hsla(210, 10%, 23%, 0.7) 0%,
    hsla(210, 10%, 23%, 1) 100%
  );

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#343A40", endColorstr="#343A40", GradientType=1 ); */
}
</style>
