<template>
  <v-app dark>
    <v-app-bar
      :fixed="false"
      app
      hide-on-scroll
      class="ma-4 rounded-lg"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        Whalinvest tracker
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon class="mx-2" @click="toggleTheme">
        <v-icon>
          {{ ($vuetify.theme.dark) ? 'fa-sun' : 'fa-moon' }}
        </v-icon>
      </v-btn>
      <v-chip class="transparent py-5">
        <div class="d-none d-md-block">
          Hi, Thomas
        </div>
        <v-avatar size="12" class="ml-2">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="User"
          >
        </v-avatar>
      </v-chip>
    </v-app-bar>
    <v-main>
      <v-navigation-drawer
        v-model="drawer"
        class="deep-purple accent-4"
        app
        fixed
      >
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>
                fa-home
              </v-icon>
            </v-list-item-action>
            <v-list-item-title>Page 1</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-container class="mt-6">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  mounted () {
    const theme = localStorage.getItem('useDarkTheme')
    if (theme) {
      this.$vuetify.theme.dark = theme === 'true'
    }
  },
  methods: {
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('useDarkTheme', this.$vuetify.theme.dark.toString())
    }
  }
}
</script>

<style>
.v-chip .v-avatar {
  height: 32px !important;
  width: 32px !important;
}
</style>
