export function setBalance(state, balance) {
  state.balance = balance
}

export function createOperation(state, operation) {
  state.operations.push(operation)

  let newBalance = null
  if (operation.postType === "income")
    newBalance = state.balance + parseFloat(operation.amount)
	else 
		newBalance = state.balance - parseFloat(operation.amount)

  state.balance = newBalance
}
