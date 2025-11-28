import {readFile} from "fs/promises"
import { adViewStatisticsCachePath } from "../utils/constants.js"
import { saveCache } from "./utils/saveCache.js"


export async function checkAndGetUserAdViewStatistics(userId, adArray) {
  const adViewStatistics = JSON.parse(await readFile(adViewStatisticsCachePath))

  const userAdViewStatistics = adViewStatistics.filter(s => s.user_id === userId)
  
  const adWithoutStatistics = []
  adArray.forEach(ad => {
    const hasUserAdStatistic = userAdViewStatistics.some(obj => obj.ad_id === ad.id)

    if (!hasUserAdStatistic) adWithoutStatistics.push(ad)
  })

  if (adWithoutStatistics.length > 0) {
    adWithoutStatistics.forEach(ad => {
      const adStatistic = {
        user_id: userId,
        ad_id: ad.id,
        impression_count: 0,
        is_recently_viewed: false
      }
      adViewStatistics.unshift(adStatistic)
      userAdViewStatistics.unshift(adStatistic)
    })
  }
  saveCache(adViewStatisticsCachePath, JSON.stringify(adViewStatistics))
  return userAdViewStatistics
}

