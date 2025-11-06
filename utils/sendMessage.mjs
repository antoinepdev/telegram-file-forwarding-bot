import { bot } from "../config.mjs"

export async function sendMessage (chatId, text) {
  try {
    bot.sendMessage(chatId, text)
  } catch (error) {
    
  }
}
