<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Home</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
          <!-- Feature Coming soon! -->
          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em v-if="user === null">User</em>
              <b-avatar v-if="user" :src="user.photoURL"></b-avatar>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <GoogleSignIn v-if="user === null" />
            <b-navbar-nav v-if="user">
              <b-nav-text> Welcome, {{ user.displayName }} </b-nav-text>
            </b-navbar-nav>
            <b-dropdown-item @click="logout" v-if="user">
              Logout
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import GoogleSignIn from '~/components/Auth/GoogleSignIn'
export default {
  components: {
    GoogleSignIn,
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logoutUser')
    },
  },
}
</script>

<style scoped>
.navbar-text {
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}
</style>