<template>
  <q-page class="" padding>
    <q-carousel
      v-model="currentWallet"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      navigation
      control-color="black"
      height="auto"
      ref="carousel"
      class="center-controls"
    >
      <q-carousel-slide v-for="wallet in wallets" :key="wallet._id" :name="wallet.name" class="">
        <AppCard>
            <template #title>
              {{wallet.balance}} {{ wallet.currency.sign}}
            </template>
            {{wallet.name}}
        </AppCard>
      </q-carousel-slide>        
    </q-carousel>
      <div class="pl1 pr1">
        <DropdownTable :operations="operations"/>
      </div>
    
    <OpearationForm />
  </q-page>
</template>

<script>
import OpearationForm from './OperationForm'
import DropdownTable from '../../components/DropdownTable'
import AppCard from '../../components/AppCard'
import {mapGetters} from 'vuex'
export default {
  components: {
    OpearationForm,
    DropdownTable,
    AppCard
  },
  computed: {
    ...mapGetters({
      getAccount: 'mainPage/getAccount',
      user: 'users/getUser',
      wallets: 'wallets/getWallets',
      operations: 'mainPage/getOperations'
    })
  },
  data() {
    return {
      currentWallet: ''
    }
  },
  created() {
    // this.$store.dispatch('mainPage/someAction')
    this.$store.dispatch('users/getUserById', {
      token: process.env.TEST_USER_TOKEN,
      id: process.env.TEST_USER_ID
    })
    this.$store.dispatch('wallets/getWallets', {
      user: process.env.TEST_USER_ID
    })
  },
  watch: {
    wallets(val){
      console.log(val)
      if(val.length) {
        this.currentWallet = val[0].name
      }

    }
  }

}
</script>
<style lang="scss" >
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

.center-controls {
  padding-bottom: 20px;
  .q-carousel__slide {
    padding: 10px;
    padding-bottom: 30px;
  }
  .q-carousel__navigation {
    justify-content: center;
    bottom: -10px;
    &-icon {
      font-size: 8px !important;
    }
  }

}
</style>
