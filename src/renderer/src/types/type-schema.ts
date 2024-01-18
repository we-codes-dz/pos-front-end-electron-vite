export type TUser = {
  id: string
  createdAt: string
}
export type TProduct = {
  id: number
  name: string
  description: string
  price: number
  avatar?: TAvatar
  category: number
}

export type TMeta = {
  currentPage: number
  itemsPerPage: number
  sortBy: string[]
  totalItems: number
  totalPages: number
}
export type TAvatar = {
  id: string
  name: string
  url: string
  mimetype: string
  size: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type TCategory = {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  name: string
  avatar?: TAvatar
  products?: TProduct[]
  parent?: TCategory[]
  children?: TCategory[]
}

export type TOrder = {
  id: number
  total: number
  table: number
  products: TProduct[]
}

export interface SaleInt {
  id: number
  total: number
  table: number
  products: TProduct[]
}

export interface SaleInt {
  id: number
  floor: number
  number: number
  isAvailable: boolean
  maxSeats: number
  usedSeats: number
  orders: TOrder[]
}

export type TTable = {
  id: number
  floor: number
  number: number
  isAvailable: boolean
  maxSeats: number
  usedSeats: number
  orders: TOrder[]
}

export type TAuth = {}

export type TColumn = {
  key: number
  label: string
}

export type TProductColumn = {
  key: string
  label: string
}
