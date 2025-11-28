import { adViewStatisticsCachePath } from "../utils/constants.js"
import { saveCache } from "./utils/saveCache.js"

export async function restartAds(userAdStatistics, adArray) {
  const adNumber = userAdStatistics.length
  const adSeen = userAdStatistics.filter(adS => adS.is_recently_viewed)
  if (adNumber !== adSeen.length) return userAdStatistics

  const updatedUserAdStatistics = userAdStatistics.map(adS => {
    const ad = adArray.find(ad => ad.id === adS.ad_id)
    if (ad.is_unique) return adS
    else return {...adS, is_recently_viewed: false}
  })

  saveCache(adViewStatisticsCachePath, JSON.stringify(updatedUserAdStatistics))

  return updatedUserAdStatistics
}




