import { FecthAllUsers } from "../../services/fetch-all-users.js";

export async function fecthAllUsersController(_, response) {
  const fetchAllUsers = new FecthAllUsers()
  const { users } = await fetchAllUsers.execute()

  return response.status(200).send({ users })
}