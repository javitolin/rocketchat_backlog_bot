const config = require('config');
const axios = require("axios")

const ADO_URL = encodeURI(config.get("ado.url"));
const ADO_PAT = config.get("ado.pat")

// ADO_URL (Should be https://{instance}/{collection}/{project}/_apis)

if (!ADO_URL || !ADO_PAT) {
  console.error("Missing required environment variables for ADO.");
  process.exit(1);
}

const ENCODED_PAT = Buffer.from(`:${ADO_PAT}`).toString('base64');

const adoClient = axios.create({
  baseURL: ADO_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json-patch+json',
    "Authorization": `Basic ${ENCODED_PAT}`
  }
});

adoClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    console.error(error.message)
    console.error(`Looks like there was a problem. Status Code: ${res.status}`);
    return Promise.reject(error);
  }
);

module.exports = { adoClient };