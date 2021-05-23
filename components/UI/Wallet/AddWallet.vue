<template>
  <div>
    <b-button v-b-modal.modal_1> <BIconWallet2 /> Add Wallet</b-button>
    <b-modal id="modal_1" title="BootstrapVue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>

<script>
import { BIconWallet2 } from 'bootstrap-vue'
export default {
  components: {
    BIconWallet2,
  },
}
</script>

<style>
</style>