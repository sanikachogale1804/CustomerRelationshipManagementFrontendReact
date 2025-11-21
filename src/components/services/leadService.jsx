import axios from 'axios';

export const BASE_URL="http://localhost:8080/leads"

export const getLeads = () => {
    return axios.get(BASE_URL);
}