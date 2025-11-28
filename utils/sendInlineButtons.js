import { bot } from "../config.js"
import {getCurrentDateTimeInStringFormat} from './getCurrentDateTimeInStringFormat.js'

const instruction_message = `🎬 ¡Necesitas ver un anuncio para obtener el archivo!


🦄 Sigue los siguientes pasos para obtener el archivo:
1️⃣ Pulsa en "🚀 Ver Anuncio Para Desbloquear el archivo" esto te redireccionará hacia el anuncio (un sitio web)
2️⃣  Espera a que el anuncio (el sito web) cargue completamente y pulsa "Start" en caso de ser necesario.
3️⃣ Regresa a nuestro bot y pulsa en "🛸 Obtener Archivo" y ¡Listo! La película llegará a tu chat.
`


export async function sendInlineButtons(userId, ad, fileId) {
  const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Ver Anuncio para Desbloquear el Archivo.",
            url: ad.link
          },
          { text: "🛸 Obtener Archivo.", callback_data: `${fileId}###${getCurrentDateTimeInStringFormat()}` }
        ]
      ]
    }
  }

  try {
    await bot.sendMessage(userId, ad.instruction_message === "webapp" ? instruction_message : ad.instruction_message, inlineKeyboard)
  } catch (e) {

  }
}
