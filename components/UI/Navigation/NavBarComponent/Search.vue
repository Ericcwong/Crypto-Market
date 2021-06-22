<template>
  <b-nav-form>
    <b-form-input
      size="sm"
      class="mr-sm-2"
      placeholder="Search "
      v-model="name"
    ></b-form-input>
    <b-button
      size="sm"
      class="my-2 my-sm-0"
      type="submit"
      @click.prevent="search"
      >Search</b-button
    >
  </b-nav-form>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  methods: {
    search() {
      let name = this.name.toLowerCase().split(' ').join('')
      this.$router.push(`/${name}`)
    },
  },
}
</script>

<style></style>
