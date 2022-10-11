import io from 'axios'

const context = io.create({
   method: 'get'
 })

context.interceptors.request.use((config) => {
  // console.log(config)
    return config
}, (error) => {
  return Promise.reject(error)
})

context.interceptors.response.use((response) =>{
  // console.log(response)
  return response
}, (error) =>{
  return Promise.reject(error)
})

export default context