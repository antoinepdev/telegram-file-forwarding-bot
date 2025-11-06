import { bot, fileStorageId, botBaseUrl } from "../config.mjs"
import { serverError } from "../utils/serverError.mjs"

bot.on("message", async msg => {
  const chatId = msg.chat.id
  if (chatId != fileStorageId) return
  if (!msg.video && !msg.document) return

  sendLinkFile(msg)
})

function sendLinkFile(msg) {
  const chatId = msg.chat.id
  const message = `${botBaseUrl}?start=${msg.message_id}`
  bot
    .sendMessage(chatId, `\`\`\`\n${message}\n\`\`\``, {
      parse_mode: "MarkdownV2"
    })
    .catch(error => {
      console.error("Error trying to send the link file: " + error)
      serverError(msg)
    })
}
