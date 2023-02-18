const config = require('config');
const Helper = require("./action_utils");

function isMatch(message) {
    const key_words = config.get("actions.dev_help.key_words");
    const match_type = config.get("actions.dev_help.match_type");
    return Helper.getMatchFunc(match_type)(message, key_words);
}

function act(message, requestor_name) {
    let result = ["### General"]
    result.push("- field_for_name - Can be `name` or `username`");
    result.push("- bot_room - Must be some existing room");
    result.push("### actions");
    result.push("match_type can be any of the following: ");
    result.push("- endsWith - uses `endsWith` to match");
    result.push("- includes - uses `includes` to match");
    result.push("- exact - uses `===` to match");
    result.push("- regex - uses `RegExp.test()` to match");
    result.push("- startsWith - uses `startsWith` to match");
    result.push("- default - uses `startsWith` to match");
    result.push("### static actions");
    result.push(" - Can be added directly to the config file, without the need to add code");
    result.push(" - Replaces `{message}` with the message sent by the user (encapsulated in `\"\"`)");
    result.push(" - Replaces `{requestor_name}` with the user's name (configurable in `{field_for_name}`)");
    result.push("### wiki_result_url");
    result.push(" - Replaces `{project}` with the project name");
    result.push(" - Replaces `{path}` with the path name");
    result.push(" - Replaces `{path_no_md}` with the path name without the `.md` extension");
    result.push(" - Replaces `{wiki_name}` with the wiki name");
    result.push(" - Replaces `{wiki_id}` with the wiki id");
    result.push(" - Replaces `{project_id}` with the project id");
    result.push(" - Replaces `{content_id}` with the `contentId`");
    result.push("### Ticket Action - Title format");
    result.push(" - Replaces `{message}` with the message sent by the user (encapsulated in `\"\"`)");
    result.push(" - Replaces `{requestor_name}` with the user's name (configurable in `{field_for_name}`)");
    result.push("### Ticket Action - Description format");
    result.push(" - Replaces `{message}` with the message sent by the user (encapsulated in `\"\"`)");
    result.push(" - Replaces `{requestor_name}` with the user's name (configurable in `{field_for_name}`)");
    result.push(`For more information, please contact ${config.get("rocketchat.bot_manager_user")}`)
    return result;
}

module.exports = { isMatch, act };