import axios from 'axios'
import { baseURL } from './endpoints'

const instance = axios.create({
  baseURL
}) 

export default instance