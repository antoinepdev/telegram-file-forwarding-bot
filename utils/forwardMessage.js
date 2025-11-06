import { bot, fileStorageId } from "../config.js"

export async function forwardMessage (chatId, fileId) {
  try {
    bot.copyMessage(chatId, fileStorageId, fileId)
  } catch (error) {
    
  }
}
