import { writeFile } from "fs/promises"

export async function saveCache(cachePath, data) {
  try {
    writeFile(cachePath, data)
  } catch (error) {
    console.error("An error occurred while trying to save the cache: " + error)
  }
}
