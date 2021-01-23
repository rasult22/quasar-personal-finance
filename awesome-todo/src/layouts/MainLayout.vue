<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-green" elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title> {{this.$router.history.current.name}} </q-toolbar-title>
      </q-toolbar>
    </q-header>

      <!-- <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        content-class="bg-grey-1"
      >
        <q-list>
          <q-item-label header class="text-grey-8">
            Essential Links
          </q-item-label>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-green text-white">
      <q-list class="row justify-around">
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue"

const linksData = [
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

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    logger(item) {
      console.log(item)
    }
  }
}
</script>
