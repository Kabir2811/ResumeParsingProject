import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/student', // Replace with your Spring Boot API URL
});

export default instance;