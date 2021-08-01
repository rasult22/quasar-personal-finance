import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1',
  timeout: 30000
})
