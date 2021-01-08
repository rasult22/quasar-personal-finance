<template>
  <div>
    <q-dialog v-model="addMode">
      <q-card class="my-card">
        <q-parallax
          src="https://previews.customer.envatousercontent.com/files/315831155/preview.jpg"
          :height="100"
        />
        <q-card-section>
          <div class="text-h6">New opeation</div>
          <div>
            <q-btn-toggle
              v-model="postType"
              no-caps
              rounded
              @click="category = ''"
              class="q-mb-sm q-mt-sm"
              unelevated
              dark
              :toggle-color="postType === 'income' ? 'green' : 'red'"
              color="grey"
              :options="[
                { label: 'Income', value: 'income' },
                { label: 'Expense', value: 'expense' },
              ]"
            />
          </div>
          <q-form>
            <div class="d-flex">
              <q-input
                class="full-width"
                v-model="amount"
                standout="bg-green text-white"
                label="Amount *"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon name="money" />
                </template>
              </q-input>
              <q-select
                class="q-ml-sm"
                standout="bg-green text-white"
                :options="currencyOptions"
                v-model="currency"
              >
              </q-select>
            </div>
            <q-select
              class="q-ml-sm full-width q-mt-sm"
              standout="bg-green text-white"
              label="Category *"
              :options="
                postType === 'income'
                  ? incomeCategoryOptions
                  : expenseCategoryOptions
              "
              v-model="category"
            >
              <template v-slot:prepend>
                <q-icon name="category" />
              </template>
            </q-select>
            <q-input
              v-model="comments"
              filled
              label="Comments"
              class="q-mt-md"
              standout="bg-green text-white"
              type="textarea"
            > 
            </q-input>
            <q-btn @click="createOperation" class="bg-green text-white q-mt-lg">Create</q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="add-button">
      <q-btn round color="green" @click="addMode = !addMode" icon="add" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addMode: false,
      postType: "income",
      amount: 0,
      currencyOptions: ["$", "₸"],
      currency: "₸",
      incomeCategoryOptions: ["Payday", "Freelance", "Business", "Other"],
      expenseCategoryOptions: ["Food", "Transport", "Bills"],
      category: "",
      comments: ''
    }
  },
  methods: {
    createOperation () {
      let operation = new Operation(this.amount, this.postType, this.currency, this.category, this.comments)
      this.$store.commit('mainPage/createOperation', operation )
      this.addMode = false
    }
  }
}


class Operation {
  constructor (amount, postType, currency, category, comments, date = new Date().toISOString().split('T')[0]) {
    this.amount = amount
    this.postType = postType
    this.currency = currency
    this.category = category
    this.comments = comments
    this.date = date
  }
}
</script>

<style lang="scss" scoped>
.add-button {
  position: fixed;
  bottom: 70px;
  right: 30px;
}
</style>