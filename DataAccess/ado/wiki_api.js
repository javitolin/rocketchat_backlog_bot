const client = require("../base_wiki_api")
const configuration = require('config');
const { build_string } = require("../../Utils/build_string");
const MAX_SEARCH_RESULTS = configuration.get("ado.wiki.max_search_results")

async function SearchWiki(message) {
    var data = {
        "searchText": message,
        "$skip": 0,
        "$top": MAX_SEARCH_RESULTS,
        "$orderBy": null,
        "includeFacets": true
    };

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        data: data
    };

    try {
        var response = await client.client(config);
        if (response.data.count === 0) { 
            return [] 
        }
        
        let return_answer = []

        for (let i = 0; i < response.data.count; i++) {
            let result = response.data.results[i];
            let result_url = build_string(configuration.get("ado.wiki.result_url"), result)
            var result_title = build_string(configuration.get("ado.wiki.result_title"), result);

            return_answer.push({
                title: result_title,
                url: result_url
            });
        }

        return return_answer;
    }
    catch (err) {
        console.log("Error running searchApi", err);
        return null;
    }
}

module.exports = { SearchWiki }