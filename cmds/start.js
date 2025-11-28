import { checkAndGetUserAdViewStatistics } from "../cache/checkAndGetUserAdViewStatistics.js"
import { findAvailableAd } from "../cache/findAvailableAd.js"
import { findUserInCache } from "../cache/findUserInCache.js"
import { getAdsFromCache } from "../cache/getAdsFromCache.js"
import { restartAds } from "../cache/restartAds.js"
import { saveUserInCache } from "../cache/saveUserInCache.js"
import { setUserAdViewStatisticsInCache } from "../cache/setUserAdViewStatisticsInCache.js"
import { updateUserAdViewStatisticsInCache } from "../cache/updateUserAdViewStatisticsInCache.js"
import { updateUserTotalDownloadsInCache } from "../cache/updateUserTotalDownloadsInCache.js"
import { bot, numberFilesPerAd, welcomeMessage } from "../config.js"
import { startAdTimer } from "../utils/adVisibilityTracker.js"
import { forwardMessage } from "../utils/forwardMessage.js"
import { configButtonHandler } from "../utils/getFileButtonHandler.js"
import { sendInlineButtons } from "../utils/sendInlineButtons.js"
import { sendMessage } from "../utils/sendMessage.js"

bot.onText(/^\/start/, async msg => {
  const chatId = msg.chat.id
  if (msg.chat.type !== "private" || msg.from.is_bot) return
  const fileId = getFileIdInLinkFile(msg) // returns string || null
  if (!fileId) return sendMessage(chatId, welcomeMessage)

  const userId = msg.from.id
  const userInCache = await findUserInCache(userId) // returns undefined or an object
  if (!userInCache) {
    saveUserInCache(userId)
    forwardMessage(chatId, fileId)
    return
  }

  const user = userInCache
  // The following logic states that for every "n" files sent, the user has to see an advertisement. ("n" in this case is the "numberFilesPerAd" variable) )
  if (user.totalDownloads % numberFilesPerAd !== 0) {
    forwardMessage(userId, fileId)
    updateUserTotalDownloadsInCache(userId)
    return
  }

  const adArray = await getAdsFromCache() // Ads are ordered by priority in descending order

  if (user.totalDownloads === numberFilesPerAd) {
    configButtonHandler(adArray[0], setUserAdViewStatisticsInCache, adArray)
    sendInlineButtons(userId, adArray[0], fileId)
    startAdTimer()
    return
  }

  const userAdStatistics = await checkAndGetUserAdViewStatistics(userId, adArray)
  const restartedAds = await restartAds(userAdStatistics, adArray)
  if (restartedAds.every(adS => adS.is_recently_viewed)) {
    forwardMessage(userId, fileId)
    updateUserTotalDownloadsInCache()
    return
  }
  const selectedAd = await findAvailableAd( restartedAds, adArray)

  configButtonHandler(selectedAd, updateUserAdViewStatisticsInCache, selectedAd.id)
  sendInlineButtons(userId, selectedAd, fileId)
  startAdTimer()


})

function getFileIdInLinkFile(msg) {
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
