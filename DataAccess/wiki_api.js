const adoClient = require("./search_api")
const config = require('config');

const ADO_API_VERSION = config.get("ado.api_version")

async function SearchWiki(message, maxNumberOfResults) {
    var data = {
        "searchText": message,
        "$skip": 0,
        "$top": maxNumberOfResults,
        "$orderBy": null,
        "includeFacets": true
    };

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `/search/wikisearchresults?recursionLevel=full&includeContent=True&api-version=${ADO_API_VERSION}`,
        data: data
    };

    try {
        var response = await adoClient.searchApi(config);
        return response.data;
    }
    catch (err) {
        console.log("Error running searchApi", err);
        return null;
    }
}

module.exports = { SearchWiki }