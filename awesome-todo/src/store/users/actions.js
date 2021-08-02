import users from '../../api/users'

export async function getUserById (context, { id, token }) {
  const {data} = await users.getUser(id, token)
  const user = data.data.user
  context.commit('setUser', user)
}
