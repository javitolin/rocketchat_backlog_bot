const config = require('config');

const ADO_PAT = config.get("ado.pat")
const ADO_URL = encodeURI(config.get("ado.url"));
const CONTENT_TYPE = "application/json-patch+json"

// ADO_URL (Should be https://{instance}/{collection}/{project}/_apis)
if (!ADO_URL || !ADO_PAT) {
    console.error("Missing required environment variables for ADO.");
    process.exit(1);
}


const AUTHORIZATION_STRING = `:${ADO_PAT}`

module.exports = { 
    authorization_string: AUTHORIZATION_STRING, 
    base_url: ADO_URL, 
    content_type: CONTENT_TYPE 
}