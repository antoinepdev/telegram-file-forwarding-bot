import { bot } from "../../config.js"
import { userCachePath, adViewStatisticsCachePath, adsCachePath } from "../../utils/constants.js"
import { isAdmin } from "../../utils/isAdmin.js"

bot.onText(/^\/backup/, async msg => {
  if (msg.chat.type !== "private" || msg.from.is_bot) return

  const userId = msg.from.id
  if (!isAdmin(userId)) return

  bot.sendDocument(userId, userCachePath)
  bot.sendDocument(userId, adsCachePath)
  bot.sendDocument(userId, adViewStatisticsCachePath)
})
