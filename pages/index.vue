<template>
  <section class="landing-page">
    <div class="title">
      Crypto wallet
      <div class="icons">
        <img
          v-for="(icon, index) in icons"
          :class="{ crypto: index }"
          :src="icon.icon"
          :key="icon.index"
          :alt="index"
        />
      </div>
      <div
        class="prices"
        v-for="crypto in state.cryptos"
        :key="crypto.cryptoName"
      >
        <span class="crypto-name">
          {{ crypto.cryptoName }}
        </span>
        <span>${{ crypto.cryptoPrice }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, ref, onMounted } from '@nuxtjs/composition-api'
import axios from 'axios'
export default {
  components: {},
  setup() {
    const state = reactive({
      cryptos: [],
    })
    // Saves space in the template area
    const icons = ref([
      {
        icon:
          'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/btc.svg',
        ref: 'bitcoin',
      },
      {
        icon:
          'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/eth.svg',
        ref: 'ethereum',
      },
      {
        icon:
          'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/usdt.svg',
        ref: 'tether',
      },
      {
        icon:
          'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/doge.svg',
        ref: 'dogecoin',
      },
      {
        icon:
          'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/ada.svg',
        ref: 'cardano',
      },
    ])

    const getPriceAPI = async () => {
      let data = icons.value.forEach((el) => {
        const cryptoName = el.ref
        axios
          .get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`
          )
          .then((res) => {
            let cryptoPrice = res.data[cryptoName].usd
            state.cryptos.push({ cryptoName, cryptoPrice })
          })
      })
    }
    onMounted(getPriceAPI)
    return { icons, getPriceAPI, state }
  },
}
</script>

<style scoped>
.landing-page {
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  height: 100vh;
}

.title {
  font-size: 3rem;
}
.icons {
  display: flex;
  justify-content: space-evenly;
}
.icon {
  width: 5rem;
  margin-left: 20px;
  margin-right: 20px;
  animation-name: slideInIcons;
  animation-duration: 1s;
}
.crypto-name {
  text-transform: capitalize;
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
