const config = require('config');

const JIRA_URL = encodeURI(config.get("jira.ticket.base_url"));
const JIRA_USERNAME = config.get("jira.username")
const JIRA_TOKEN = config.get("jira.token")
const CONTENT_TYPE = "application/json"

if (!JIRA_URL || !JIRA_USERNAME || !JIRA_TOKEN) {
    console.error("Missing required environment variables for Jira.");
    process.exit(1);
}

const AUTHORIZATION_STRING = `${JIRA_USERNAME}:${JIRA_TOKEN}`

module.exports = {
    authorization_string: AUTHORIZATION_STRING,
    ticket: {
        base_url: JIRA_URL,
        content_type: CONTENT_TYPE
    },
    wiki: {
        content_type: CONTENT_TYPE
    }
}