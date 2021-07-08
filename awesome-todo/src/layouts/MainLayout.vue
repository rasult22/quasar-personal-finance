<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-green" elevated>
      <q-toolbar>
        <q-toolbar-title> {{this.$router.history.current.name}} </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <BottomBar class="show-on-mobile" />
      

    <q-page-container>
      <router-view />
    </q-page-container>
    
  </q-layout>
</template>

<script>
import BottomBar from "components/BottomBar.vue"

export default {
  name: "MainLayout",
  components: { BottomBar },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Main",
          caption: "Main Page",
          icon: "home",
          link: "/"
        },
        {
          title: "Settings",
          caption: "Personal settings",
          icon: "settings",
          link: "/settings"
        },
        {
          title: "Additional features",
          caption: "Future coming additional features",
          icon: "lightbulb",
          link: "/"
        }
        ]
    }
  },
  methods: {
    logger(item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>

</style>
