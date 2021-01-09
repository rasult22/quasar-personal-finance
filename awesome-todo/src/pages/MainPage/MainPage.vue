<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div>
          <div class="text-h6">{{getAccount.name}}</div>
          <div class="text-subtitle2">Balance: {{getAccount.balance.toLocaleString('en-US')}} {{getAccount.currency}}</div>
        </div>
        <div class="q-mt-md" v-if="getAccount.hasDiffCurrency">
          <p class="text-subtitle2">Additional account</p>
          <p class="text-subtitle2">Balance: {{ getAccount.diffBalance.toLocaleString('en-US')   }} {{getAccount.diffCurrency}} </p>
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
            <th class="text-left">Cash</th>
            <th class="text-left">Operation type</th>
            <th class="text-left ">Comments</th>
            <th class="text-left">Category</th>
            <th class="text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="operation in operations" 
          :key="operation.date + operation.amount + operation.comments" 
          >
            <td class="text-left">{{operation.postType === 'income' ? '+' : '-'}} {{`${operation.amount} ${operation.currency}`}}</td>
            <td class="text-left">{{ operation.postType}}</td>
            <td :class="{'tr-expense': operation.postType === 'expense', 'tr-income' :operation.postType === 'income'}" class="text-left">{{operation.comments}}</td>
            <td class="text-left">{{operation.category}}</td>
            <td class="text-left">{{ operation.date }}</td>
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
      getAccount: 'mainPage/getAccount',
      operations: 'mainPage/getOperations'
    })
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.tr-income {
  //transform: scale(1);
  &::before {
    display: block;
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    left:5px;
    top: 5px;
    background:green;
    border-radius: 100%;
  }
}
.tr-expense {
  //transform: scale(1);
  &::before {
    display: block;
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    left:5px;
    top: 5px;
    background:red;
    border-radius: 100%;
  }
}
</style>
