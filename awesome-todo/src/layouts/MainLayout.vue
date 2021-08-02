<template>
  <q-layout view="lHh Lpr lFf">

    <Header :title="'Aqsha Tracker'"/>

    <q-page-container>
      <router-view />
    </q-page-container>
    
    <BottomBar class="show-on-mobile" />
  </q-layout>
</template>

<script>
import BottomBar from "components/BottomBar.vue"
import Header from "components/Header.vue"

export default {
  name: "MainLayout",
  components: { BottomBar, Header },
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

<style scoped lang="scss">

</style>
