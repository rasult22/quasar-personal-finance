<template>
  <div class="app-card">
      <div class="app-card__title">
        <slot name="title">
        </slot>
      </div>
      <div class="app-card__content">
        <slot>
        </slot>
      </div>
      <slot name="controls" class="app-card__controls">

      </slot>
  </div>  
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .app-card {
    display:flex;
    flex-wrap: wrap;
    padding: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    &__title {
      width: 100%;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
</style>
