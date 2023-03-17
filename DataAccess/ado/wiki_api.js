const client = require("../base_wiki_api")
const configuration = require('config');
const { build_wiki_url } = require("../../Utils/ado_string_builders");

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
        var response = await client.client(config);
        console.log("response.data", response.data)
        if (response.data.count === 0) { 
            return [] 
        }
        
        let return_answer = []

        for (let i = 0; i < response.data.count; i++) {
            let result = response.data.results[i];
            let wiki_result_url = build_wiki_url(result);
            var fileName = result.fileName;

            return_answer.push({
                "filename": fileName,
                "result_url": wiki_result_url
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