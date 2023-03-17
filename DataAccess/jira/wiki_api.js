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
            let result_url = build_string(configuration.get("jira.wiki.result_url"), result);
            var result_title = build_string(configuration.get("jira.wiki.result_title"), result, false);

            return_answer.push({
                title: result_title,
                url: result_url
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