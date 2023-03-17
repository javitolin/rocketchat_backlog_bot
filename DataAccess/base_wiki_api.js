const config = require('config');
const axios = require("axios");

const { authorization_string, wiki } = require(`./${config.get("general.platform")}/parameters`)

const ENCODED_PAT = Buffer.from(authorization_string).toString('base64');

const client = axios.create({
    baseURL: wiki.base_url,
    headers: {
        'Accept': 'application/json',
        'Content-Type': wiki.content_type,
        "Authorization": `Basic ${ENCODED_PAT}`
    }
});

client.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error?.response;
        console.error(error?.message)
        console.error(`Looks like there was a problem. Status Code: ${res?.status}`);
        return Promise.reject(error);
    }
);

module.exports = { client };