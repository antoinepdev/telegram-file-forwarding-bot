import {readFile} from "fs/promises"
import { userCachePath } from "../utils/constants.js"

export async function findUserInCache(userId) {
  const usersArray = JSON.parse(await readFile(userCachePath))
  const findedUser = usersArray.find(user => user.id === userId)
  return findedUser
}
