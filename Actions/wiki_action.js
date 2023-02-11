const SearchWiki = require("../DataAccess/wiki_api")
const config = require('config');
const Helper = require("./action_helper")

const MAX_SEARCH_RESULTS = config.get("ado.wiki.max_search_results")
const ADO_WIKI_URL = config.get("ado.wiki.wiki_url")

const key_words = config.get("actions.wiki_search.key_words");
function isMatch(message) {
    return key_words.some(word => message.startsWith(word));
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
        var project_wiki = result.wiki.name;
        var wiki_path = result.path.replace(".md", "");
        var fileName = result.fileName;
        return_answer.push(`[${fileName}](${ADO_WIKI_URL}/${project_wiki}?pagePath=${wiki_path})`)
    }

    return return_answer
}

module.exports = { act, isMatch };