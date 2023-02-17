const config = require('config');

const key_words = config.get("actions.help.key_words");
function isMatch(message) {
    return key_words.some(word => message.startsWith(word));
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
    return result;
}

module.exports = { isMatch, act };