<template>
    <q-card class="q-mt-md dropdown-table">
      <div class="dropdown-table__title">
        <q-chip>
          <q-avatar icon="bookmark" color="red" text-color="white" />
          {{ type }}
        </q-chip>
        <q-icon name="expand_more" class="dropdow-table__title-icon" />
      </div>
      
      <!-- <q-markup-table flat bordered>
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
      </q-markup-table> -->
    </q-card>
</template>

<script>
export default {

props: {
  operations: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: () => 'No operation type'
  }
}
}
</script>

<style scoped lang="scss">

  .dropdown-table {
    &__title {
      display: flex;
      justify-content: space-between;
    }
  }

</style>