const config = require('config');
const axios = require("axios")

const JIRA_URL = encodeURI(config.get("jira.url"));
const JIRA_USERNAME = config.get("jira.username")
const JIRA_TOKEN = config.get("jira.token")

if (!JIRA_URL || !JIRA_USERNAME || !JIRA_TOKEN) {
    console.error("Missing required environment variables for Jira.");
    process.exit(1);
}

const ENCODED_PAT = Buffer.from(`${JIRA_USERNAME}:${JIRA_TOKEN}`).toString('base64');
console.log("ENCODED_PAT", ENCODED_PAT);

const jiraClient = axios.create({
    baseURL: JIRA_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Basic ${ENCODED_PAT}`
    }
});

jiraClient.interceptors.response.use(
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

module.exports = { client: jiraClient };