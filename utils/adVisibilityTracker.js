import { adDisplayTimeout } from "../config.js"

let adSeen = false

export async function isAdSeenAfterTimer () {
  return adSeen
}

export async function startAdTimer () {
  setTimeout(()=> adSeen=true, adDisplayTimeout)
}

export async function resetAdSeenStatus () {
  adSeen = false
}
