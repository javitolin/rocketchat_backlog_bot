const config = require('config');

const { driver } = require("@rocket.chat/sdk");
const Mapper = require("./Actions/mapper")

const ROCKETCHAT_URL = config.get("rocketchat.url");
const ROCKETCHAT_USER = config.get("rocketchat.user");
const ROCKETCHAT_PASSWORD = config.get("rocketchat.password");
const ROCKETCHAT_USE_SSL = config.get("rocketchat.use_ssl");

if (!ROCKETCHAT_URL || !ROCKETCHAT_USER || !ROCKETCHAT_PASSWORD) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

// Function generated via chat.openai.com
function getFunnyErrorMessage() {
  const messages = [
    "Oops! Something went wrong, but don't worry, it's not your fault... it's definitely ours.",
    "Well this is embarrassing, our code monkeys are working on fixing the issue.",
    "We're experiencing some unexpected turbulence, but we'll have it sorted out shortly.",
    "Don't panic, but there's a small glitch in the system... or as we like to call it, a Thursday afternoon.",
    "Looks like our robots have gone rogue, they're working on a solution as we speak.",
    "An error? That's impossible, I'm a language model, I don't make mistakes... right?",
    "Don't worry, the error is just a temporary setback, like a speed bump on the highway of life.",
    "Uh oh, it looks like we hit a bump in the matrix. But don't worry, we've sent Neo to fix it.",
    "Our systems have experienced a minor hiccup, like a sneeze in the middle of a concert.",
    "A wild error has appeared! But don't worry, our IT wizards are on the case."
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}


var myUserId;

// Bot configuration
const runbot = async () => {
  const ssl = !!ROCKETCHAT_USE_SSL;

  const conn = await driver.connect({
    host: ROCKETCHAT_URL,
    useSsl: ssl,
  });
  myUserId = await driver.login({
    username: ROCKETCHAT_USER,
    password: ROCKETCHAT_PASSWORD,
  });
  console.info("logged in", myUserId);

  let bot_room = config.get("rocketchat.bot_room");
  if (bot_room) {
    const roomsJoined = await driver.joinRooms([bot_room]);
    console.debug("joined rooms");
  }

  const subscribed = await driver.subscribeToMessages();
  console.debug("subscribed");

  const msgloop = await driver.reactToMessages(processMessages);
  console.debug("connected and waiting for messages");

  const sent = await driver.sendToRoom(
    ROCKETCHAT_USER + " is listening ...",
    bot_room
  );
};

// Process messages
const processMessages = async (err, message, messageOptions) => {
  if (!err) {
    if (message.u._id === myUserId) return; // This is me! Ignore

    console.debug(`got message ${JSON.stringify(message)}`);
    const received_message = parseMessage(message);

    var action = Mapper.MapAction(received_message.message);

    try {
      var response = await action(received_message.message, received_message.username);
      if (!response) return;

      await driver.sendToRoomId(response, message.rid);
    }
    catch (err) {
      console.log(err);
      await driver.sendToRoomId(getFunnyErrorMessage(), message.rid);
    }
  }

  function parseMessage(message) {
    console.log("message", message)
    var field_for_name = config.get("rocketchat.field_for_name");
    var username = message.u.username;
    if (field_for_name === "name") {
      username = message.u.name;
    }

    return {
      username: username,
      message: message.msg
    }
  }
};

runbot();
