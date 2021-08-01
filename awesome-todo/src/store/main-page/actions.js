import axios from 'axios'
// axios.baseURL = 'http://127.0.0.1:5000/api/v1'

const config = {
  baseURL: 'http://127.0.0.1:5000/api/v1',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDI5MjIxMDBlODdjNTE1ODExM2NkMiIsImlhdCI6MTYyNzU1ODQ5MSwiZXhwIjoxNjM1MzM0NDkxfQ.2d4oeNvwLjA-fzwg5Zihs46vdjwm_T2vZsXivIDm3jQ`
  }
}

export async function someAction (/* context */) {
  // console.log(axios)
  const data = await axios.get('/transactions', config )
  // console.log(this);
  console.log(data)
}
