import TelegramBot from "node-telegram-bot-api"

// Config enviroment variables

function envVariablesValidator(envVariableKey, envVariableValue ) {
  if (!envVariableValue) throw new Error("Envarioment variable not provided: " + envVariableKey + " : " + envVariableValue)
}

const botToken = process.env.BOT_TOKEN;
const fileStorageId = process.env.FILE_STORAGE_ID
const botBaseUrl = process.env.BOT_BASE_URL
const welcomeMessage = process.env.WELCOME_MESSAGE
envVariablesValidator("BOT_TOKEN", botToken)
envVariablesValidator("FILE_STORAGE_ID", fileStorageId)
envVariablesValidator("BOT_BASE_URL", botBaseUrl)
envVariablesValidator("WELCOME_MESSAGE", welcomeMessage)

// Start bot
const bot = new TelegramBot(botToken, { polling: true })

export {bot, fileStorageId, botBaseUrl, welcomeMessage}
