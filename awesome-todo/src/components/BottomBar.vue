<template>
  <q-footer elevated class="bottom-bar bg-green text-white">
      <q-list class="flex justify-around">
        <EssentialLink
          class="bottom-bar__item"
          v-for="link in barItems"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-footer>
</template>

<script>
import EssentialLink from "./EssentialLink.vue"

export default {
  name: 'BottomBar',
  components: { EssentialLink },
  props: { 
    barItems: { 
      type: Array,
      default() { 
        return [
        {
          title: "Main",
          // caption: "Main Page",
          icon: "home",
          link: "/"
        },
        {
          title: "Settings",
          // caption: "Personal settings",
          icon: "settings",
          link: "/settings"
        },
        {
          title: "Additional features",
          // caption: "Future coming additional features",
          icon: "lightbulb",
          link: "/"
        }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.bottom-bar {
  &__item {
    flex-grow: 1;
  }
}
</style>