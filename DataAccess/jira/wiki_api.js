const client = require("../base_wiki_api")
const configuration = require('config');
const { build_string } = require("../../Utils/build_string");

async function SearchWiki(message, maxNumberOfResults) {
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        baseURL: encodeURI(client.client.defaults.baseURL.replace("message", message)),
    };

    try {
        var response = await client.client(config);
        if (response.data.size === 0) {
            return []
        }

        let return_answer = []
        for (let i = 0; i < response.data.size; i++) {
            let result = response.data.results[i];
            let wiki_result_url = build_string(configuration.get("jira.wiki.wiki_result_url"), result);
            var fileName = build_string(configuration.get("jira.wiki.wiki_result_title"), result, false);

            return_answer.push({
                "filename": fileName,
                "result_url": wiki_result_url
            });
        }

        return return_answer
    }
    catch (err) {
        console.log("Error running client", err);
        return null;
    }
}

module.exports = { SearchWiki }