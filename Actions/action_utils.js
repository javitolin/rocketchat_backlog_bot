function getTextFromMessage(message) {
    console.debug("before", message)
    message = message.match("\".+\"")[0]
    message = message.slice(1) // Remove first "
    message = message.substring(0, message.length - 1) // Remove last "
    console.debug("after", message)

    return message
}

function getMatchFunc(matchType) {
    switch (matchType) {
        case "endsWith":
            return (message, key_words) => key_words.some(key_word => message.endsWith(key_word));
        case "includes":
            return (message, key_words) => key_words.some(key_word => message.includes(key_word));
        case "exact":
            return (message, key_words) => key_words.some(key_word => message === key_word);
        case "regex":
            return (message, key_words) => key_words.some(key_word => (new RegExp(key_word)).test(message));
        case "startsWith":
        default:
            return (message, key_words) => key_words.some(key_word => message.startsWith(key_word));
    }
}

module.exports = { getTextFromMessage, getMatchFunc };