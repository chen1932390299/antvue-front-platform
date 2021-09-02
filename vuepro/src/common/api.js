import axios from 'axios'
const qs = require('qs')
const api = {
  async get (url, data) {
    try {
      let res = await axios.get(url, {params: data})
      res = res.data
      return new Promise((resolve) => {
        if (res.code === 200) {
          resolve(res)
        } else {
          resolve(res)
        }
      })
    } catch (err) {
      
      console.log(err)
    }
  },
  async post (url, data) {
    try {
      let res = await axios.post(url, qs.stringify(data))
      return new Promise((resolve, reject) => {
        if (res.status === 200) {
         
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      // return (e.message)
      console.log(err)
    }
  },

  async patch (url, data) {
    try {
      let res = await axios.patch(url, qs.stringify(data))
      return new Promise((resolve, reject) => {
        if (res.status === 200) {
         
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      // return (e.message)
      console.log(err)
    }
  },

}
export { api }