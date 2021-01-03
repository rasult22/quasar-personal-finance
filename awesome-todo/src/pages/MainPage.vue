<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div>
          <div class="text-h6">Current account</div>
          <div class="text-subtitle2">25.650 ₸</div>
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
        <thead>
          <tr>
            <th class="text-left">Description</th>
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
    <div class="add-button">
      <q-btn round color="green" @click="addMode = !addMode" icon="add" />
    </div>
    <q-dialog v-model="addMode">
      <q-card class="my-card">
        <q-parallax
          src="https://previews.customer.envatousercontent.com/files/315831155/preview.jpg"
          :height="100"
        />
        <q-card-section>
          <div class="text-h6">New opeation</div>
          <q-form>
            <div class="d-flex">
              <q-input
                class="full-width"
                v-model="amount"
                standout="bg-green text-white"
                append="cash-100"
                label="Amount"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon name="money" />
                </template>
              </q-input>
              <q-select
                class="q-ml-sm"
                standout="bg-green"
                :options="currencyOptions"
                v-model="currency"
              ></q-select>
            </div>
            <q-card-actions>
              <q-btn class="bg-green text-white">Create</q-btn>
            </q-card-actions>
          </q-form>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      addMode: false,
      amount: 0,
      currencyOptions: ["$", "₸"],
      currency: "₸"
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
