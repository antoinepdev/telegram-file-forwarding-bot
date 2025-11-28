import {readFile} from "fs/promises"
import { adViewStatisticsCachePath } from "../utils/constants.js"
import { saveCache } from "./utils/saveCache.js"


export async function setUserAdViewStatisticsInCache(userId, adArray) {
  const adViewStatistics = JSON.parse(await readFile(adViewStatisticsCachePath))

  adArray.forEach((ad, index) => {
    const adViewStatistic = {
      user_id: userId,
      ad_id: ad.id,
      impression_count: 0,
      is_recently_viewed: false
    }
    return adViewStatistics.unshift( index === 0 ? {...adViewStatistic, impression_count: 1, is_recently_viewed: true} : adViewStatistic)
  })

  saveCache(adViewStatisticsCachePath, JSON.stringify(adViewStatistics))
}
