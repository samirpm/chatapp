import axios from 'axios'

var instance =axios.create({
    baseURL:"http://localhost:4000"
})
export default instance