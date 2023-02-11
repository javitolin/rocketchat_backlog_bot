const OpenTicket = require("../DataAccess/ticket_api")
const Helper = require("./action_helper")
const fs = require("fs").promises
const config = require('config');

const ADO_DEFAULT_ASSIGNEE = config.get("ado.task.default_assignee")
const ADO_AREA_PATH = config.get("ado.task.area_path")
const ADO_DOD_FILEPATH = config.get("ado.task.dod_filepath")
const ADO_PARENT_TASK_ID = config.get("ado.task.parent_task_id")
const ADO_TAGS = config.get("ado.task.tags")

const key_words = config.get("ticket_action.key_words");
function isMatch(message) {
    return key_words.some(word => message.startsWith(word));
}

async function act(message, requestor_name) {
    message = Helper.getTextFromMessage(message);
    
    var description = `User: ${requestor_name}. \nMessage: ${message}`;
    var title = `Auto Ticket from - ${requestor_name}`;
    var dod_content = (await fs.readFile(ADO_DOD_FILEPATH)).toString();
    var area_path = ADO_AREA_PATH;
    var parent_task_id = ADO_PARENT_TASK_ID;
    var tags = ADO_TAGS;
    var assignee = ADO_DEFAULT_ASSIGNEE;

    var response = await OpenTicket.OpenTicket(title, description, dod_content, area_path, parent_task_id, tags, assignee);
    if (!response) {
        return "An error occured. Please see the logs for more information."
    }

    return [
        "A ticket was opened.",
        `Please follow the issue using this [link](${response._links.html.href})`
    ]
}

module.exports = { act, isMatch };