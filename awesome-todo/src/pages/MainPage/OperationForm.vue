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
                label="Amount"
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
              label="Category"
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
            <q-btn class="bg-green text-white q-mt-lg">Create</q-btn>
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
      testprop: 1
    }
  },
  watch: {
    addMode(value) {
      this.addModeInner = value
    }
  }
}
</script>

<style lang="scss" scoped>
.add-button {
  position: absolute;
  bottom: 30px;
  right: 30px;
}
</style>