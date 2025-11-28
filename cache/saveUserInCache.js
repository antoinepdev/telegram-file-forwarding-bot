import {readFile} from "fs/promises"
import { userCachePath } from "../utils/constants.js"
import { saveCache } from "./utils/saveCache.js"

export async function saveUserInCache (userId) {
  const usersArray = JSON.parse(await readFile(userCachePath))
  usersArray.unshift({id: userId, totalDownloads: 1})

  const userCacheData = JSON.stringify(usersArray)

  saveCache(userCachePath, userCacheData)
}


