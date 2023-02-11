const config = require('config');

const { api, driver } = require("@rocket.chat/sdk");
const Mapper = require("./Actions/mapper")

const ROCKETCHAT_URL = config.get("rocketchat.url");
const ROCKETCHAT_USER = config.get("rocketchat.user");
const ROCKETCHAT_PASSWORD = config.get("rocketchat.password");
const ROCKETCHAT_USE_SSL = config.get("rocketchat.use_ssl");

if (!ROCKETCHAT_URL || !ROCKETCHAT_USER || !ROCKETCHAT_PASSWORD) {
  console.error("Missing required environment variables.");
  process.exit(1);
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
  await api.login({ username: ROCKETCHAT_USER, password: ROCKETCHAT_PASSWORD }); 

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

    if (!received_message.message.includes("\"")) {
      return;
    }

    var action = Mapper.MapAction(received_message.message);
    var response = await action(received_message.message, received_message.username);

    if (!response) return;

    await driver.sendToRoomId(response, message.rid);
  }

  function parseMessage(message) {
    return {
      username: message.u.username,
      message: message.msg
    }
  }
};

runbot();
