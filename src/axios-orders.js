import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-my-burger-9054d.firebaseio.com/'
})

export default instance