export enum WishState {
  PENDING = 'pending',
  GRANTED = 'granted',
}

export interface Wish {
  index: number,
  title: string,
  description?: string,
  link?: string,
  state: WishState

}

export interface WishlistInfo {
  title: string,
  description?: string,
  wishes: Wish[],
}

export interface NewWishlistDTO{
  wishlistInfo: WishlistInfo,
  newPassword: string,
}
