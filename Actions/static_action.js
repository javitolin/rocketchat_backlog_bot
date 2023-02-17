const config = require('config');
const Helper = require("./action_helper")

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

function isMatch(message) {
    found_static_commands = static_commands.find(static_command => static_command.key_words.some(word => message.startsWith(word)));
    if (found_static_commands) {
        return true;
    }
}

async function act(message, requestor_name) {
    found_static_commands = static_commands.find(static_command => static_command.key_words.some(word => message.startsWith(word)));
    if (!found_static_commands) {
        return `Static command for term [${message}] not found... Weird.`;
    }

    message = Helper.getTextFromMessage(message);
    return found_static_commands.response.replace("{term}", message).replace("{requestor}", requestor_name);
}

module.exports = { act, isMatch };