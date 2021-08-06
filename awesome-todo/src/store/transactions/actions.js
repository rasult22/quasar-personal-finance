import transactions from '../../api/transactions'

export async function getTransactions (context) {
  const { data } = await transactions.getTransactions()
  context.commit('setTransactions', data?.data?.transactions)
}
