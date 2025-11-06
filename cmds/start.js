import { bot, welcomeMessage } from "../config.js"
import { forwardMessage } from "../utils/forwardMessage.js"
import { sendMessage } from "../utils/sendMessage.js"

bot.onText(/^\/start/, async msg => {
  const chatId = msg.chat.id
  if (msg.chat.type !== "private") return
  const fileId = getFileIdInLinkFile(msg) // returns string || null

  if (!fileId) return sendMessage(chatId, welcomeMessage)
  forwardMessage(chatId, fileId)
})

export function getFileIdInLinkFile(msg) {
  const linkFile = msg.text
  const splitedLinkFile = linkFile.split("")
  const initialPosition = splitedLinkFile.lastIndexOf(" ") + 1
  if (initialPosition !== 0) {
    const splitedFileId = splitedLinkFile.slice(initialPosition)
    const fileId = splitedFileId.join("")
    return fileId
  } else {
    return null
  }
}
