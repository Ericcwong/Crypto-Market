<template>
  <div class="sidebar">
    <div class="logo">
      <div class="logo-name">Crypto Wallet Tracker</div>
    </div>
    <div class="button-container">
      <div class="buttons">
        <AddWallet />
      </div>
    </div>
  </div>
</template>

<script>
import AddWallet from '~/components/UI/Wallet/AddWallet'
export default {
  components: {
    AddWallet,
  },
}
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
.button-container {
  display: flex;
}
.buttons {
}
</style>