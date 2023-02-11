const WikiAction = require("./wiki_action")
const TicketAction = require("./ticket_action")
const DefaultAction = require("./default_action")

function MapAction(message) {
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