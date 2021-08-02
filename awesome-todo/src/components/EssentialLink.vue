<template>
  <q-item
    clickable
    tag="a"
    @click="$router.push(link)"
    :style="`color: ${color}; background-color: ${bgColor};`"
    class="jcc"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section class="show-on-desktop">
      <q-item-label >{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'black'
    },
    bgColor: {
      type: String,
      default: 'white'
    }
  }
}
</script>
