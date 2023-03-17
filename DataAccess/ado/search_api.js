const axios = require("axios")
const config = require('config');

const ADO_ALM_URL = encodeURI(config.get("ado.alm_url"))
const ADO_PAT = config.get("ado.pat")

// ADO_ALM_URL (Should be https://almsearch.{instance}/{collection}/{project}/_apis)

if (!ADO_ALM_URL || !ADO_PAT) {
  console.error("Missing required environment variables for ADO SEARCH.");
  process.exit(1);
}

const ENCODED_PAT = Buffer.from(`:${ADO_PAT}`).toString('base64');
const searchApi = axios.create({
  baseURL: encodeURI(ADO_ALM_URL),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Authorization": `Basic ${ENCODED_PAT}`
  }
});

searchApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error?.response;
    console.error("error: ", error?.message)
    console.error(`Looks like there was a problem. Status Code: ${res?.status}`);
    return Promise.reject(error);
  }
);

module.exports = { searchApi };