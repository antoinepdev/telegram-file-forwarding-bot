import {readFile} from "fs/promises"
import { adViewStatisticsCachePath } from "../utils/constants.js"
import { saveCache } from "./utils/saveCache.js"


export async function updateUserAdViewStatisticsInCache(userId, adId) {
  const adViewStatistics = JSON.parse(await readFile(adViewStatisticsCachePath))
  const updatedAdViewStatistics = adViewStatistics.map(adS => {
    if (adS.user_id === userId && adS.ad_id === adId) {
      return {...adS, impression_count: adS.impression_count+1, is_recently_viewed: true}
    }
    return adS
  })

  saveCache(adViewStatisticsCachePath, JSON.stringify(updatedAdViewStatistics))
}
