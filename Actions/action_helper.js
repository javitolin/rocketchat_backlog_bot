function getTextFromMessage(message) {
    console.debug("before", message)
    message = message.match("\".+\"")[0]
    message = message.slice(1) // Remove first "
    message = message.substring(0, message.length - 1) // Remove last "
    console.debug("after", message)

    return message
}

module.exports = { getTextFromMessage };