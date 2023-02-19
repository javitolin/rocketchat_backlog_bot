const adoClient = require("./ado_api")
const configuration = require('config');

const ADO_URL = configuration.get("ado.url");

async function OpenTicket(title, description, dod_content, area_path, parent_task_id, tags, assignee) {

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
        "value": area_path
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
        var response = await adoClient.adoClient(config);
        return response.data;
    }
    catch (err) {
        console.log("Error running adoClient", err);
        return null;
    }
}

module.exports = { OpenTicket }