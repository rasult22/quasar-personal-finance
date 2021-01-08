export function setBalance(state, balance) {
  state.account.balance = balance
}

export function createOperation(state, operation) {
  state.operations.push(operation)
  let newBalance = null

  // Appying operation to additional account, when the currency isn't default
  if (operation.currency !== state.account.currency) {
    if (operation.postType === "income")
      newBalance = state.account.diffBalance + parseFloat(operation.amount)
	  else
      newBalance = state.account.diffBalance - parseFloat(operation.amount)
      
    state.account.diffCurrency = operation.currency
    state.account.hasDiffCurrency = true
    state.account.diffBalance = newBalance
    return
  }

  // Else just appying operation to default account
  if (operation.postType === "income")
    newBalance = state.account.balance + parseFloat(operation.amount)
	else 
		newBalance = state.account.balance - parseFloat(operation.amount)

  state.account.balance = newBalance
}
