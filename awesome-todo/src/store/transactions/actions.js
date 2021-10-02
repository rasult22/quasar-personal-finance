import transactions from '../../api/transactions'

export async function getTransactions (context) {
  const { data } = await transactions.getTransactions()
  context.commit('setTransactions', data?.data?.transactions)
}
export async function getTransactionsByWallet (context, wallet) {
  const { data } = await transactions.getTransactionsByWallet(wallet)
  context.commit('setTransactions', data?.data?.transactions)
}
