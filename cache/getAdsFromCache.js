import {readFile} from "fs/promises"
import { adsCachePath } from "../utils/constants.js"

export async function getAdsFromCache() {
  const adsArray = JSON.parse(await readFile(adsCachePath))
  return adsArray
}
