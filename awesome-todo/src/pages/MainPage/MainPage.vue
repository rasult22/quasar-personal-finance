<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div>
          <div class="text-h6">Balance</div>
          <div class="text-subtitle2">{{getBalance}} ₸</div>
        </div>
        <div></div>
      </q-card-section>
      <q-card-section>
        <p class="color-red">Total Spending: - 36.999 ₸</p>
        <p class="color-green">Total Income: + 62.250 ₸</p>
      </q-card-section>
    </q-card>
    <q-card class="q-mt-md">
      <q-markup-table flat bordered>
        <thead class="bg-blue-1">
          <tr >
            <th class="text-left ">Description</th>
            <th class="text-left">Category</th>
            <th class="text-left">Cash</th>
            <th class="text-left">Date</th>
            <th class="text-left">Opeation type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Frozen Yogurt</td>
            <td class="text-left">Food</td>
            <td class="text-left">- 620 ₸</td>
            <td class="text-left">2020-01-02</td>
            <td class="text-left color-red">Spending</td>
          </tr>
          <tr>
            <td class="text-left">Ice cream sandwich</td>
            <td class="text-left">Payday</td>
            <td class="text-left">+ 250.000 ₸</td>
            <td class="text-left">2020-01-02</td>
            <td class="text-left color-green">Income</td>
          </tr>
          <tr>
            <td class="text-left">Eclair</td>
            <td class="text-left">Freelance</td>
            <td class="text-left">+ 16.000 ₸</td>
            <td class="text-left">2020-01-02</td>
            <td class="text-left color-green">Income</td>
          </tr>
          <tr>
            <td class="text-left">Cupcake</td>
            <td class="text-left">Food</td>
            <td class="text-left">- 2300 ₸</td>
            <td class="text-left">2020-01-02</td>
            <td class="text-left color-red">Spending</td>
          </tr>
          <tr>
            <td class="text-left">Gingerbread</td>
            <td class="text-left">Bills</td>
            <td class="text-left">- 27.000 ₸</td>
            <td class="text-left">2020-01-02</td>
            <td class="text-left color-red">Spending</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
    <OpearationForm />
  </q-page>
</template>

<script>
import OpearationForm from './OperationForm'
import {mapGetters} from 'vuex'
export default {
  components: {
    OpearationForm
  },
  computed: {
    ...mapGetters({
      getBalance: 'mainPage/getBalance'
    })
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
