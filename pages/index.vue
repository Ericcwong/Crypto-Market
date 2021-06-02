<template>
  <div class="container">
    <section class="landing-page">
      <div class="title">
        Crypto wallet
        <Table />
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from '@nuxtjs/composition-api'
import axios from 'axios'
import Table from '~/components/UI/Market/Table'
export default {
  components: { Table },
}
</script>

<style scoped>
.landing-page {
  color: white;
  min-height: 100vh;
  height: 100%;
}

.title {
  font-size: 3rem;
}

/* Keyframes */
@keyframes slideInIcons {
  from {
    transition: left 300ms linear;
  }
  to {
    transition: left 300ms linear;
  }
}
</style>
