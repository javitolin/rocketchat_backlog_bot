const SearchWiki = require("../DataAccess/wiki_api")
const config = require('config');
const Helper = require("./action_helper")

const MAX_SEARCH_RESULTS = config.get("ado.wiki.max_search_results")
const ADO_WIKI_URL = config.get("ado.wiki.wiki_url")

const key_words = config.get("actions.wiki_search.key_words");
function isMatch(message) {
    return key_words.some(word => message.startsWith(word));
}

function build_wiki_url(result) {
    let wiki_result_url = config.get("ado.wiki.wiki_result_url");

    wiki_result_url = wiki_result_url.replace("{project}", result.wiki.name);
    wiki_result_url = wiki_result_url.replace("{path}", result.path);
    wiki_result_url = wiki_result_url.replace("{path_no_md}", result.path.replace(".md", ""));
    wiki_result_url = wiki_result_url.replace("{wiki_name}", result.wiki.name);
    wiki_result_url = wiki_result_url.replace("{wiki_id}", result.wiki.id);
    wiki_result_url = wiki_result_url.replace("{project_id}", result.project.id);
    wiki_result_url = wiki_result_url.replace("{content_id}", result.contentId);
    return wiki_result_url;
}

async function act(searchTerm, requestor_name) {
    searchTerm = Helper.getTextFromMessage(searchTerm);

    console.log("Searching for", searchTerm, "by", requestor_name)
    var response = await SearchWiki.SearchWiki(searchTerm, MAX_SEARCH_RESULTS);
    if (!response) {
        return "An error occured. Please see the logs for more information."
    }

    if (response.count === 0) {
        return "No wikis for you"
    }

    return_answer = ["Found the following wiki articles:"]

    for (let i = 0; i < response.count; i++) {
        let result = response.results[i];
        console.log("result", result);
        let wiki_result_url = build_wiki_url(result);
        var fileName = result.fileName;
        return_answer.push(`- [${fileName}](${wiki_result_url})`)
    }

    return return_answer
}

module.exports = { act, isMatch };