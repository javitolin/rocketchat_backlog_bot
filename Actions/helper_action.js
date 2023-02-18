const config = require('config');
const Helper = require("./action_utils");

function isMatch(message) {
    const key_words = config.get("actions.help.key_words");
    const match_type = config.get("actions.help.match_type");
    return Helper.getMatchFunc(match_type)(message, key_words);
}

function getCommands() {
    let actions = config.get("actions");
    let result = [];
    for (var key of Object.keys(actions)) {
        let current_action = actions[key];
        let usage_string = `## ${current_action.description}\r\n`;
        usage_string += `- Key words: ${current_action.key_words.join(", ")}\r\n`;
        usage_string += `- Type: ${current_action.type}\r\n`;
        usage_string += `- Usage: ${current_action.usage}\r\n`;
        result.push(usage_string);
    }

    return result;
}

function act(message, requestor_name) {
    let result = ["Sure! Here are the commands I understand:"];
    result = result.concat(getCommands());
    result.push("Don't forget to add \"\" for the term");
    result.push(`For more information, please contact ${config.get("rocketchat.bot_manager_user")}`)
    return result;
}

module.exports = { isMatch, act };