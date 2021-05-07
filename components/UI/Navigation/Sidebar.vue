<template>
  <div class="sidebar">
    <div class="logo">
      <div class="logo-name">Crypto Wallet Tracker</div>
    </div>
    <div class="buttons">
      <b-button v-b-modal.modal-1>Launch demo modal</b-button>

      <b-modal id="modal-1" title="BootstrapVue">
        <p class="my-4">Hello from modal!</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.sidebar {
  background: #343a40;
  color: white;
  border-right: 1px solid white;
}
.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  height: 8%;
}
</style>