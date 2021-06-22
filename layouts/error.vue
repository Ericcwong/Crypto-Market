<template>
  <div class="container">
    <section class="content">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <NuxtLink to="/"> Home page </NuxtLink>
    </section>
    <section class="image">
      <img src="/error.jpg" alt="" />
    </section>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1,
a {
  font-size: 3rem;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.image {
  width: 50%;
}
img {
  width: 80%;
}
</style>
