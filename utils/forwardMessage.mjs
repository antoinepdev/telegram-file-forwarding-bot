import { bot, fileStorageId } from "../config.mjs"

export async function forwardMessage (chatId, fileId) {
  try {
    bot.copyMessage(chatId, fileStorageId, fileId)
  } catch (error) {
    
  }
}
