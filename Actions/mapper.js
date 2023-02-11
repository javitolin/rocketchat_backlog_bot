const WikiAction = require("./wiki_action")
const TicketAction = require("./ticket_action")
const DefaultAction = require("./default_action")
const HelperAction = require("./helper_action")

function MapAction(message) {
    if (HelperAction.isMatch(message)) {
        return HelperAction.act;
    }

    if (!message.includes("\"")) {
        DefaultAction.act;
    }

    if (WikiAction.isMatch(message)) {
        return WikiAction.act;
    }

    if (TicketAction.isMatch(message)) {
        return TicketAction.act;
    }

    console.log("Returning Default action");
    return DefaultAction.act;
}

module.exports = { MapAction }