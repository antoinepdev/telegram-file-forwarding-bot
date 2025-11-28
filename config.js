import TelegramBot from "node-telegram-bot-api"

// Config enviroment variables

function envVariablesValidator(envVariableKey, envVariableValue ) {
  if (!envVariableValue) throw new Error("Envarioment variable not provided: " + envVariableKey + " : " + envVariableValue)
}

const botToken = process.env.BOT_TOKEN;
const fileStorageId = process.env.FILE_STORAGE_ID
const botBaseUrl = process.env.BOT_BASE_URL
const welcomeMessage = process.env.WELCOME_MESSAGE
const adminId = process.env.ADMIN_ID
envVariablesValidator("BOT_TOKEN", botToken)
envVariablesValidator("FILE_STORAGE_ID", fileStorageId)
envVariablesValidator("BOT_BASE_URL", botBaseUrl)
envVariablesValidator("WELCOME_MESSAGE", welcomeMessage)
envVariablesValidator("ADMIN_ID", adminId)

// optional env variables
const numberFilesPerAd = parseInt(process.env.NUMBER_FILES_PER_AD) || 4
const adDisplayTimeout = parseInt(process.env.AD_DISPLAY_TIMEOUT) * 1000 || 7000

// Start bot
const bot = new TelegramBot(botToken, { polling: true })

export {bot, fileStorageId, botBaseUrl, welcomeMessage, adminId, numberFilesPerAd, adDisplayTimeout}
