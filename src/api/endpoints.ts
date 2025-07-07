import { apiRequest } from "./utils"

const login = async (email: string, password: string): Promise<void> => {
  const path = '/api/auth/unlock'
  await apiRequest<string>(path)
}
