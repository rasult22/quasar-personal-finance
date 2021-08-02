import axios from 'axios'


const wallets = {
  api: process.env.VUE_APP_SERVER_URL,
  token: process.env.TEST_USER_TOKEN,
  getWallets (params) {  
    return axios.get(`/wallet`, {
      baseURL: this.api,
      params,
      headers: {
        Authorization: this.token
      }
    })
  }
}


export default wallets