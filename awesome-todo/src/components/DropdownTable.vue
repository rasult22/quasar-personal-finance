<template>
    <div class="q-mt-md dropdown-table">
      <div class="dropdown-table__title">
          <q-card-section class="table-card">
               <div class="table-card__name-main">
              <q-avatar class="q-avatar table-card__icon--avatar" icon="bookmark" color="red" text-color="white" />
              {{ type }}
               </div>
            <div class="table-card__icon--side"> <q-icon name="expand_more"/>  </div>
          </q-card-section>
      </div>
      <div class="dropdown-table-cards">
        <div v-for="operation in operations" :key="operation">
          <q-card-section class="table-card">
            <div class="table-card__icon-container">
              <div class="table-card__icon"> 
                <q-icon class="table-card__icon-el" name="coffee"/>
              </div>
            </div>
            <div class="table-card__name">
              <div>
                <div class="table-card__name-main">{{operation.category}}</div>
                <div class="table-card__name-second">{{operation.date}}</div>
              </div>
            </div>
            <div class="table-card__details">
                 
              <div class="table-card__details-main" :class="{'table-card__details-main--income': isIncome(operation) }">  {{isIncome(operation) ? '+' : '-'}} {{operation.amount + ` ` + operation.currency}} </div>  
              <div class="table-card__details-second"> {{operation.comments}}</div>  
            </div>
          </q-card-section>
        </div>
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
    </div>
</template>

<script>
export default {

props: {
  operations: {
    type: Array,
    default: () => [
      {
        amount:"50",
        postType:"income",
        currency:"₸",
        category:"Freelance",
        comments:"5454",
        date:"2021-07-16"
      }
    ]
  },
  type: {
    type: String,
    default: () => 'No operation type'
  }
},
computed: {
  // isn 
},
methods: {
  isIncome(operation) {
    return operation.postType === 'income'
  }
}
}
</script>

<style scoped lang="scss">

  .dropdown-table {
    // box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    // border: 1px solid #ddd;
    border-radius: 10px;
    &__title {
      display: flex;
      justify-content: space-between;
    }
  }

  .table-card {
    display: flex;
    width: 100%;
    &__icon {
      // min-width: ;
      // flex-shrink: 0;
      // width: 100%;
      // height: 100%;
      background-color:rgba(23,34,0,0.1);
      display: flex;
      align-items: center;
      padding: 6px 8px;
      border-radius: 22%;
      margin-right: 20px;

      &-container {
        display: flex;
        align-items: center;

        min-width: 60px;
      }
      &-el {
        font-size: 26px;
        color: peru;
      }

      &--side {
        margin-left: auto;
      }
      &--avatar {
        margin-right: 12px;
        font-size: 2.2rem;
      }
    }
    &__name {
      min-width: 100px;
      &-main {
        font-weight: bold;
        font-size: 1.1rem;
      }
      &-second {
        font-size: 0.8rem;
        color: #c4c4c4;
      }
    }
    &__details {
      margin-left: auto;
      &-main {
        font-weight: bold;
        font-size: 1.1rem;
        text-align: right;
        color: #FD6363;
        &--income {
          color: #7ADB9F;
        }
      }
      &-second {
        font-size: 0.8rem;
        color: #c4c4c4;
      }
    }
  }

</style>