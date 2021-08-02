import axios from 'axios'


const users = {
  api: process.env.VUE_APP_SERVER_URL,
  
  getUser (id, bearer) {  
    return axios.get(`/users/${id}`, {
      baseURL: this.api,
      headers: {
        Authorization: bearer
      }
    })
  }
}


export default users