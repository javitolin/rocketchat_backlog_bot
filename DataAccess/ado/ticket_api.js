const client = require("../base_ticket_api")
const { build_string } = require("../../Utils/build_string");
const configuration = require('config');

const ADO_AREA_PATH = configuration.get("ado.ticket.area_path")

async function OpenTicket(title, description, dod_content, parent_url, tags, assignee) {

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
            "url": parent_url
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
        data: data
    };

    try {
        var response = await client.client(config);
        return {
            id: build_string(configuration.get("ado.ticket.response_id"), response.data),
            url: build_string(configuration.get("ado.ticket.response_link"), response.data)
        }
    }
    catch (err) {
        console.log("Error running client", err);
        return null;
    }
}

module.exports = { OpenTicket }