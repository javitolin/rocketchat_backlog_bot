const config = require('config');

const ADO_PAT = config.get("ado.pat")
const ADO_URL = encodeURI(config.get("ado.ticket.url"));
const ADO_ALM_URL = encodeURI(config.get("ado.wiki.url"))

// ADO_URL (Should be https://{instance}/{collection}/{project}/_apis)
if (!ADO_URL || !ADO_PAT || !ADO_ALM_URL) {
    console.error("Missing required environment variables for ADO.");
    process.exit(1);
}

module.exports = {
    authorization_string: `:${ADO_PAT}`,
    ticket: {
        base_url: ADO_URL,
        content_type: "application/json-patch+json"
    },
    wiki: {
        base_url: ADO_ALM_URL,
        content_type: "application/json"
    }
}