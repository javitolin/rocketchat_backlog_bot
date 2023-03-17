const config = require('config');
const Helper = require("./action_utils");

function isMatch(message) {
    const key_words = config.get("actions.dev_help.key_words");
    const match_type = config.get("actions.dev_help.match_type");
    return Helper.getMatchFunc(match_type)(message, key_words);
}

function act(message, requestor_name) {
    let result = ["### General",
        "- field_for_name - Can be `name` or `username`",
        "- bot_room - Must be some existing room",
        "- bot_manager_user - The user responsible for managing the bot",
        "- All responses from a REST API call can be configured with {a.b.c} path in the configuration",
        "- platform can be either `jira` or `ado`, case sensitive",
        "### actions",
        "match_type can be any of the following: ",
        "- endsWith - uses `endsWith` to match",
        "- includes - uses `includes` to match",
        "- exact - uses `===` to match",
        "- regex - uses `RegExp.test()` to match",
        "- startsWith - uses `startsWith` to match",
        "- default - uses `startsWith` to match",
        "### static actions",
        " - Can be added directly to the config file, without the need to add code",
        " - Replaces `{message}` with the message sent by the user (encapsulated in `\"\"`)",
        " - Replaces `{requestor_name}` with the user's name (configurable in `{field_for_name}`)",
        " - Set `has_user_message` to false if not message from the user is required. i.e no `\"\"`. \r\n`{requestor_name}` will still be replaced with the user's name",
        " - if `response` is an array, a random element will be chosen",
        "### Ticket Action - Title format",
        " - Replaces `{message}` with the message sent by the user (encapsulated in `\"\"`)",
        " - Replaces `{requestor_name}` with the user's name (configurable in `{field_for_name}`)",
        "### Ticket Action - Description format",
        " - Replaces `{message}` with the message sent by the user (encapsulated in `\"\"`)",
        " - Replaces `{requestor_name}` with the user's name (configurable in `{field_for_name}`)",
        "### Parameters",
        " - ticket.parent_information: For ado use full path (with /wit/..). For Jira use parent Id as string",
        `For more information, please contact ${config.get("rocketchat.bot_manager_user")} (i.e \`bot_manager_user\`)`]

    return result;
}

module.exports = { isMatch, act };