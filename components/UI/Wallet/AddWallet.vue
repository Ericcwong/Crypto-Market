<template>
  <b-modal :id="modal" title="BootstrapVue">
    <p class="my-4">Hello from modal!</p>
  </b-modal>
</template>

<script>
export default {
  props: {
    modal: String,
  },
}
</script>

<style>
</style>