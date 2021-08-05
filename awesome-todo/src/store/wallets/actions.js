import wallets from '../../api/wallets'

export async function getWallets (context, { user }) {
  const { data } = await wallets.getWallets({ user })
  context.commit('setWallets', data?.data?.wallets)
}
