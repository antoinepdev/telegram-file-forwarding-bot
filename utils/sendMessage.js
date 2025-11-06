import { bot } from "../config.js"

export async function sendMessage (chatId, text) {
  try {
    bot.sendMessage(chatId, text)
  } catch (error) {
    
  }
}
