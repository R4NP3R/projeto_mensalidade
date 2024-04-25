import axios from "axios"

const baseURL = 'http://localhost:3333/'

export const API = axios.create({
  baseURL,
})



// API.interceptors.response.use(
//   undefined,
//   function(error) {
//     if (error instanceof AxiosError) {
//       const errorMessage = error.response?.data.message
//       return Promise.reject(errorMessage);
//     }
//     return error
//   }
// )



