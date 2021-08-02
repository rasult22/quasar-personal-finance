<template>
    <div class="q-mt-md dropdown-table">
      <div class="dropdown-table__title">
          <div class="table-card">
               <div class="table-card__name-main">
              <q-avatar class="q-avatar table-card__icon--avatar" icon="bookmark" color="red" text-color="white" />
              {{ type }}
               </div>
            <div @click="toggleExpand" class="table-card__icon-side" :class="{'table-card__icon-side--close': !opened}" > <q-icon name="expand_more"/>  </div>
          </div>
      </div>
      <div v-if="opened" class="dropdown-table-cards">
        <div v-for="operation in operations" :key="operation.date + operation.comments + Math.random()">
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
data() {
  return {
    opened: false
  }
},
computed: {
  // isn 
},
methods: {
  isIncome(operation) {
    return operation.postType === 'income'
  },
  toggleExpand () {
    this.opened = !this.opened
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
    padding: 10px 10px;
    &__icon {
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

      &-side {
        margin-left: auto;
        cursor: pointer;
        font-size: 1.2rem;
        i {
          transition: all .1s ease-in-out;
        }
        &--close {
          i {
            transition: all .1s ease-in-out;
            transform:rotate(-90deg);
          }
        }
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