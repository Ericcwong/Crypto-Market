<template>
  <div class="layout">
    <Navbar />
    <Nuxt />
  </div>
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
.layout {
  background: hsla(210, 10%, 23%, 1);
  background: linear-gradient(
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

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#343A40", endColorstr="#343A40", GradientType=1 );
}
</style>
