export async function findAvailableAd (userAdStatistics, adArray) {
  const  adBlackList = userAdStatistics.filter(adS => adS.is_recently_viewed)
  const blackListIds = adBlackList.map(adS => adS.ad_id)


  const availableAds = adArray.filter(ad => {
    if (!blackListIds.some(id => id === ad.id)) return ad
  })

  // The ads are ordered by priority by default.
  const selectedAd = availableAds[0]

  return selectedAd
}
