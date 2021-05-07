<template>
  <div class="layout">
    <Sidebar class="sidebar" />
    <div class="content">
      <Navbar />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/UI/Navigation/Navbar'
import Sidebar from '~/components/UI/Navigation/Sidebar'
export default {
  components: {
    Navbar,
    Sidebar,
  },
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 5fr;
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
