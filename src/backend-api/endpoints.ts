import { setToken } from "backend-api/auth"
import { apiRequest } from "backend-api/utils"
import { AnonymousListCreatedPayload } from "types/auth"
import { NewWishlistDTO, WishlistInfo } from "types/wishlist"

export const login = async (email: string, password: string): Promise<void> => {
  const path = '/api/auth/unlock'
  await apiRequest<string>(path)
}

export const createList = async (newWishlist: NewWishlistDTO): Promise<string> => {
  const path = '/api/list';
  const result = await apiRequest<AnonymousListCreatedPayload>(path, { method: 'POST', body: JSON.stringify(newWishlist) });
  setToken(result.token);
  return result.listId
}

export const getList = async (listId: string): Promise<WishlistInfo> => {
  const path = `/api/list/${listId}`
  const response =  await apiRequest<{ id: string, wishlistInfo: WishlistInfo}>(path)
  return response.wishlistInfo
}
