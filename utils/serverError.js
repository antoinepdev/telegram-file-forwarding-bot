import { bot } from "../config.js";

async function serverError(msg) {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, "Error del servidor. Intenta de nuevo.")
}

export {serverError}
