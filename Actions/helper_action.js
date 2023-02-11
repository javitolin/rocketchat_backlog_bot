const config = require('config');
const Helper = require("./action_helper")

const key_words = config.get("actions.usage.key_words");
function isMatch(message) {
    return key_words.some(word => message.startsWith(word));
}

function getCommands() {
    let actions = config.get("actions");
    let result = [];
    for (var key of Object.keys(actions)) {
        let current_action = actions[key];
        result.push(`${current_action.description}: ${current_action.key_words.join(", ")}. Example: ${current_action.example}`)
    }

    return result;
}

function act(message, requestor_name) {
    let result = ["Sure! Here are the commands I understand:"];
    result = result.concat(getCommands());
    result.push("Don't forget to add \"\" for the term");
    return result;
}

module.exports = { isMatch, act };