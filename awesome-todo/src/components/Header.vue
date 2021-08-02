<template>
  <q-header class="bg-white app-header" elevated>
    <q-toolbar>
      <q-toolbar-title class="app-header__title"> {{ title }}</q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Header'
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
}

</style>