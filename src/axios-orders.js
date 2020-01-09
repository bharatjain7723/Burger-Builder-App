import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-react-app-8a39a.firebaseio.com/'
});

export default instance;