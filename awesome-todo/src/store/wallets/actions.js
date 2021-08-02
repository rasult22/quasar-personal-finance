import wallets from '../../api/wallets'

export async function getWallets (context, { user }) {
  const {data} = await wallets.getWallets({ user })
  // const user = data.data.user
  console.log(data, 'wallets')
  // context.commit('setUser', user)
}
