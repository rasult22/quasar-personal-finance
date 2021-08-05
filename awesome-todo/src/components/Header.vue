<template>
  <q-header class="bg-white app-header" elevated>
    <q-toolbar>
      <q-toolbar-title class="app-header__title"> {{ title }}</q-toolbar-title>
      <span class="app-header__right-title"> {{ rightTitle }}</span>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Header'
    },
    rightTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      
    }
  },
  
}
</script>

<style scoped lang="scss">
$app-header-title-color: #633fe8;

.app-header {
  padding: 5px;

  &__title {
    color: $app-header-title-color;
  }
  &__right-title {
    color: black;
    font-weight: 400;
  }
}

</style>