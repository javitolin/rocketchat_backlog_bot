const client = require("./jira_api")
const configuration = require('config');
const config = require('config');

const JIRA_URL = configuration.get("jira.url");
const DOD_FIELD_ID = config.has("jira.ticket.dod_field_id") ? config.get("jira.ticket.dod_field_id") : -1;
const ISSUE_TYPE = config.get("jira.ticket.issue_type_id");
const PROJECT_ID = config.get("jira.ticket.project_id");
const TICKET_LINK = config.get("jira.ticket.ticket_link");

function buildDescriptionObject(description, extra_content) {
    let to_return = {
        "type": "doc",
        "version": 1,
        "content": [
            {
                "type": "paragraph",
                "content": [
                    {
                        "text": description,
                        "type": "text"
                    }
                ]
            }
        ]
    }

    if (extra_content) {
        to_return.content[0].content.push({
            "text": extra_content,
            "type": "text"
        })
    }

    return to_return;
}

async function OpenTicket(title, description, dod_content, parent_task_id, tags, assignee) {
    var data = {
        "fields": {
            "project":
            {
                "id": PROJECT_ID
            },
            "parent":
            {
                "id": parent_task_id
            },
            "summary": title,
            "description": buildDescriptionObject(description, dod_content),
            "issuetype": {
                "id": ISSUE_TYPE
            },
            "labels": tags.split(";")
        }
    };

    if (DOD_FIELD_ID !== -1) {
        data[`customfield_${DOD_FIELD_ID}`] = dod_content;
    }

    if (assignee) {
        data["assignee"] = { "id": assignee }
    }

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: JIRA_URL,
        data: data
    };

    try {
        var response = await client.client(config);
        return { ticket_url: TICKET_LINK.replace("{ticket_id}", response.data.key) }
    }
    catch (err) {
        console.log("Error running client", err);
        return null;
    }
}

module.exports = { OpenTicket }