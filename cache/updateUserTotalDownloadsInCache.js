import {readFile} from "fs/promises"
import { userCachePath } from "../utils/constants.js"
import { saveCache } from "./utils/saveCache.js"

export async function updateUserTotalDownloadsInCache (userId) {
  const usersArray = JSON.parse(await readFile(userCachePath))

  usersArray.map(user => {
    if (user.id === userId) {
      return {...user, totalDownloads: user.totalDownloads++}
    }
    return user
  })

  const userCacheData = JSON.stringify(usersArray)

  saveCache(userCachePath, userCacheData)
}


