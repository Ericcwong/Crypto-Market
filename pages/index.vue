<template>
  <section class="landing-page">
    <div class="title">
      Crypto wallet manager
      <div class="icons">
        <img
          v-for="(icon, index) in icons"
          :class="{ crypto: index }"
          :src="icon.icon"
          :key="icon.index"
          :alt="index"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
export default {
  components: {},
  setup() {
    const icons = ref([
      {
        icon:
          'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/btc.svg',
      },
      {
        icon:
          'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/eth.svg',
      },
      {
        icon:
          'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/usdt.svg',
      },
      {
        icon:
          'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/doge.svg',
      },
      {
        icon:
          'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/ada.svg',
      },
    ])
    // function cryptoExtraction(item) {
    //   return item.categories.map((icon) => icon.name)
    // }
    return { icons }
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
  justify-content: center;
}
.icon {
  width: 5rem;
  margin-left: 20px;
  margin-right: 20px;
  animation-name: slideInIcons;
  animation-duration: 1s;
}
/* Keyframes */
@keyframes slideInIcons {
  from {
    transition: left 300ms linear;
  }
  to {
    transition: left 300ms linear;
  }
  /* 0% {
    transform: translateX(-100%);
  } */
  /* 20% {
    transform: translateX(-80%);
  }
  40% {
    transform: translateX(-60%);
  }
  60% {
    transform: translateX(-40%);
  }
  80% {
    transform: translateX(-20%);
  } */
  /* 100% {
    transform: translateX(0%);
  } */
}
</style>
