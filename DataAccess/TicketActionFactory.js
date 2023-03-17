const config = require('config');

const OpenTicket = require(`./${config.get("general.platform")}/ticket_api`)

module.exports = { OpenTicket };