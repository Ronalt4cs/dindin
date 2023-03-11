import axios from "axios";

export default axios.create({
  baseURL: 'http://localhost:3343',
  headers: {
    'Content-Type': 'application/json',
  }
})