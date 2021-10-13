<template>
  <div>
    <v-app-bar dense dark>
      <v-toolbar-title>Crypto Market</v-toolbar-title>

      <v-spacer></v-spacer>

      <Search />
      <!-- <v-dialog transition="dialog-bottom-transition" max-width="600"> -->
      <!-- <v-tooltip bottom> -->
      <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon dark> mdi-heart </v-icon>
          </v-btn>
        </template> -->
      <!-- <span>Favorites</span> -->
      <!-- </v-tooltip> -->
      <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on"
            >From the bottom</v-btn
          >
        </template> -->
      <!-- <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark>Opening from the bottom</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog> -->

      <!-- <div class="user">
        <div class="not-signed-in" v-if="!user">
          <GoogleSignIn />
        </div>
        <div class="signed-in" v-else>
          <span>{{ user }}</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <img v-bind="attrs" v-on="on" :src="userImage" />
            </template>
            <v-list>
              <v-btn @click.prevent="logout">Logout</v-btn>
            </v-list>
          </v-menu>
        </div>
      </div> -->
    </v-app-bar>
  </div>
</template>

<script>
import GoogleSignIn from '~/components/Auth/GoogleSignIn'
import Search from '~/components/UI/Navigation/NavBarComponent/Search.vue'
export default {
  components: { GoogleSignIn, Search },
  computed: {
    user() {
      if (this.$store.state.auth.user != null) {
        return this.$store.state.auth.user.displayName
      } else {
        return
      }
    },
    userImage() {
      return this.$store.state.auth.user.photoURL
    },
  },
  data() {
    return {}
  },
  methods: {
    userFavorites() {
      console.log(this.$store.state.auth.user)
    },
    logout() {
      this.$store.dispatch('auth/logoutUser')
    },
    favorites() {
      if (!this.user) {
        this.$store.dispatch('auth/googleSignup')
      }
    },
  },
}
</script>

<style scoped>
.home-title {
  color: white;
}
img {
  display: block;
  border-radius: 50%;
  width: 25%;
}
.signed-in {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
