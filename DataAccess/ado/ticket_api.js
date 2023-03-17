const client = require("./ado_api")
const configuration = require('config');
const config = require('config');

const ADO_URL = configuration.get("ado.url");
const ADO_AREA_PATH = config.get("ado.task.area_path")

async function OpenTicket(title, description, dod_content, parent_task_id, tags, assignee) {

    var data = [{
        "op": "add",
        "path": "/fields/System.Title",
        "from": null,
        "value": title
    },
    {
        "op": "add",
        "path": "/fields/System.Description",
        "from": null,
        "value": description
    },
    {
        "op": "add",
        "path": "/fields/System.AreaPath",
        "from": null,
        "value": ADO_AREA_PATH
    },
    {
        "op": "add",
        "path": "/fields/Microsoft.VSTS.Common.AcceptanceCriteria",
        "from": null,
        "value": dod_content
    },
    {
        "op": "add",
        "path": "/relations/-",
        "value": {
            "rel": "System.LinkTypes.Hierarchy-Reverse",
            "url": encodeURI(`${ADO_URL}/wit/workitems/${parent_task_id}`)
        }
    }];

    if (assignee) {
        data.push({
            "op": "add",
            "path": "/fields/System.AssignedTo",
            "value": assignee,
            "from": null
        })
    }

    if (tags) {
        data.push({
            "op": "add",
            "path": "/fields/System.Tags",
            "value": tags
        })
    }

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: configuration.get("ado.task.task_url"),
        data: data
    };

    try {
        var response = await client.adoClient(config);
        return { ticket_url: response.data._links.html.href }
    }
    catch (err) {
        console.log("Error running adoClient", err);
        return null;
    }
}

module.exports = { OpenTicket }