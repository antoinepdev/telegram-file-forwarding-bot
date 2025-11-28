import { bot } from "../config.js"
import { isAdSeenAfterTimer, resetAdSeenStatus } from "./adVisibilityTracker.js"
import { forwardMessage } from "./forwardMessage.js"
import { getCurrentDateTimeInStringFormat } from "./getCurrentDateTimeInStringFormat.js"
import { sendMessage } from "./sendMessage.js"
import { updateUserTotalDownloadsInCache } from "../cache/updateUserTotalDownloadsInCache.js"

let ad;
let updateOrSetUserAdViewStatisticsInCache;
let param;
const soon_access_message =`🚫 ¡Acceso no permitido!

Antes de obtener el archivo, necesitas visualizar el anuncio durante al menos 5 segundos seguidos.

Si tienes algún problema (lo cual es raro) intenta hacer el proceso de nuevo y listo.
`

bot.on("callback_query", async query => {
  const userId = query.from.id
  const [fileId, initDate] = (query.data).split("###")
  if (isDifferenceMoreThanFiveMinutes(initDate, getCurrentDateTimeInStringFormat())) return sendMessage(userId, "🚫 Su tiempo para obtener el archivo ha expirado, por lo que este botón no tendrá efecto.\n\n\n Pulse de nuevo el enlace de dicho archivo para continuar con el proceso.")

  if (await isAdSeenAfterTimer()) {
    try {
      bot.deleteMessage(userId, query.message.message_id-1)
      bot.deleteMessage(userId, query.message.message_id)
    } catch (error) {
      
    }
    forwardMessage(userId, parseInt(fileId))
    updateUserTotalDownloadsInCache(userId)
    updateOrSetUserAdViewStatisticsInCache(userId, param)
    resetAdSeenStatus()
  }
  else {
    sendMessage(userId, ad.soon_access_message === "webapp" ? soon_access_message : ad.soon_access_message)
  }

  bot.answerCallbackQuery(query.id).catch()
})

export function configButtonHandler (recivedAd, func, fParam) {
  ad=recivedAd
  updateOrSetUserAdViewStatisticsInCache=func
  param=fParam
}

function isDifferenceMoreThanFiveMinutes(dateString1, dateString2) {
    const date1 = new Date(dateString1)
    const date2 = new Date(dateString2)
    
    const differenceInMilliseconds = Math.abs(date1 - date2)
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60)

    return differenceInMinutes > 5
}
