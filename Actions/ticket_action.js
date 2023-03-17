const Helper = require("./action_utils")
const fs = require("fs").promises
const config = require("config")

const TicketActionFactory = require("../DataAccess/ticket_action_factory");

const DEFAULT_ASSIGNEE = config.get("ticket.default_assignee")
const DOD_FILEPATH = config.get("ticket.dod_filepath")
const PARENT_INFORMATION = config.get("ticket.parent_information")
const TAGS = config.get("ticket.tags")

function isMatch(message) {
    const key_words = config.get("actions.ticket_action.key_words");
    const match_type = config.get("actions.ticket_action.match_type");
    return Helper.getMatchFunc(match_type)(message, key_words);
}

async function act(message, requestor_name) {
    message = Helper.getTextFromMessage(message);

    var description = config.get("ticket.description_format");
    description = description.replace("{requestor_name}", requestor_name);
    description = description.replace("{message}", message);

    var title = config.get("ticket.title_format");
    title = title.replace("{requestor_name}", requestor_name);
    title = title.replace("{message}", message);

    var dod_content = (await fs.readFile(DOD_FILEPATH)).toString();
    var parent_information = PARENT_INFORMATION;
    var tags = TAGS;
    var assignee = DEFAULT_ASSIGNEE;

    var response = await TicketActionFactory.OpenTicket(title, description, dod_content, parent_information, tags, assignee);
    if (!response) {
        return "An error occured. Please see the logs for more information."
    }

    return [
        `Ticket id ${response.ticket_id} was opened.`,
        `You may follow it using this [link](${response.ticket_url})`
    ]
}

module.exports = { act, isMatch };