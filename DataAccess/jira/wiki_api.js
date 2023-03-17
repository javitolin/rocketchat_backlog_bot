const client = require("./search_api")
const configuration = require('config');

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
        url: encodeURI(configuration.get("ado.wiki.wiki_search_url")),
        data: data
    };

    try {
        var response = await client.searchApi(config);
        return response.data;
    }
    catch (err) {
        console.log("Error running searchApi", err);
        return null;
    }
}

module.exports = { SearchWiki }