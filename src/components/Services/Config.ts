import axios from 'axios';

const OLD_BASE_URL = `https://auction.sttoro.com/api/`;
const BASE_URL = `https://bd.parkersauction.com/api/`;

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

client.interceptors.request.use(
    async config => {
        return config;
    },
    err => {
        console.log(err)
        return Promise.reject(err);
    },
);

const oldClient = axios.create({
    baseURL: OLD_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

oldClient.interceptors.request.use(
    async config => {
        return config;
    },
    err => {
        console.log(err)
        return Promise.reject(err);
    },
);


export { client, oldClient };
