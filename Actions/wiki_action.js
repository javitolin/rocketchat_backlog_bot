const config = require('config');
const Helper = require("./action_utils");
const WikiActionFactory = require("../DataAccess/wiki_action_factory");

function isMatch(message) {
    const key_words = config.get("actions.wiki_search.key_words");
    const match_type = config.get("actions.wiki_search.match_type");
    return Helper.getMatchFunc(match_type)(message, key_words);
}

async function act(searchTerm, requestor_name) {
    searchTerm = Helper.getTextFromMessage(searchTerm);

    console.log("Searching for", searchTerm, "by", requestor_name)
    var response = await WikiActionFactory.SearchWiki(searchTerm);
    if (!response) {
        return "An error occured. Please see the logs for more information."
    }

    if (response.length === 0) {
        return "No wikis for you"
    }

    return_answer = ["Found the following articles:"]

    for (let i = 0; i < response.length; i++) {
        let result = response[i];
        return_answer.push(`- [${result.title}](${result.url})`)
    }

    return return_answer
}

module.exports = { act, isMatch };