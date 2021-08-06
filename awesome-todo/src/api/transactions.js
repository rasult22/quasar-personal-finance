import axios from 'axios'


const transactions = {
  api: process.env.VUE_APP_SERVER_URL,
  
  getTransactions () {  
    return axios.get(`/transactions`, {
      baseURL: this.api,
      headers: {
        Authorization: process.env.TEST_USER_TOKEN
      }
    })
  }
}


export default transactions