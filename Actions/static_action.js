const config = require('config');
const Helper = require("./action_utils")

var static_commands = [];
function getStaticCommands() {
    let actions = config.get("actions");
    let result = [];
    for (var key of Object.keys(actions)) {
        let current_action = actions[key];
        if (current_action.type === "static") {
            static_commands.push(current_action);
        }
    }

    return result;
}

getStaticCommands();
console.log("static_commands", static_commands)

function findMatch(message) {
    for (var key of Object.keys(static_commands)) {
        match_type = static_commands[key].match_type;
        matchFunc = Helper.getMatchFunc(match_type);
        if (matchFunc(message, static_commands[key].key_words)) {
            return static_commands[key];
        }
    }
}

function isMatch(message) {
    if (findMatch(message)) {
        return true;
    }

    return false;
}

async function act(message, requestor_name) {
    var found_static_commands = findMatch(message);
    if (!found_static_commands) {
        return `Static command for message [${message}] not found... Weird.`;
    }

    let response = found_static_commands.response;

    if (Array.isArray(found_static_commands.response)) {
        response = found_static_commands.response[Math.floor(Math.random() * found_static_commands.response.length)];
    }

    if (found_static_commands.has_user_message) {
        message = Helper.getTextFromMessage(message);
        return response.replace("{message}", message).replace("{requestor_name}", requestor_name);
    }

    return response.replace("{requestor_name}", requestor_name);
}

module.exports = { act, isMatch };