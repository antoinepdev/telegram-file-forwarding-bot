import { adminId } from "../config.js"

export async function isAdmin(userId) {
  if (userId == adminId) return true
  else return false
}
