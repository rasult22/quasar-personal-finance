<template >
  <q-page>
    <div class="container">
      <q-list>
        <q-item-label header>Accounts</q-item-label>
        <q-item  v-for="account in accountList" :key="account.id" clickable v-ripple>
          <span>{{account.name}}</span>|
          <span>{{account.currency}}</span>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>
<script>
export default {

  data () {
    return {
      accountList:[
        {
          id: 1,
          name: 'Cash',
          currency: '$'
        }
        ]
    }
  }
}
</script>
<style lang="scss">
.container {
  padding: 10px 15px;
}
</style>