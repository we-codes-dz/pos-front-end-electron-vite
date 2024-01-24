import { TCategory, TProduct, TServer } from '@renderer/types/type-schema'

export enum CategoryOrderBy {
  Name = 'name',
  Empty = ''
}

export enum ProductOrderBy {
  Name = 'name',
  Price = 'Price',
  Empty = ''
}

export enum ServerOrderBy {
  Name = 'name'
}
//** category */
export const orderCategories = (categories: TCategory[], orderBy: CategoryOrderBy): TCategory[] => {
  return categories.slice().sort((a, b) => {
    switch (orderBy) {
      case CategoryOrderBy.Name:
        return a.name.localeCompare(b.name)
      default:
        return 0 // No filtering if an unknown filter type is provided
    }
  })
}

//** product */

export const orderProducts = (products: TProduct[], orderBy: ProductOrderBy): TProduct[] => {
  return products.slice().sort((a, b) => {
    switch (orderBy) {
      case ProductOrderBy.Name:
        return a.name.localeCompare(b.name)
      case ProductOrderBy.Price:
        return a.price - b.price
      default:
        return 0 // No filtering if an unknown filter type is provided
    }
  })
}

export const orderServers = (servers: TServer[], orderBy: ServerOrderBy): TServer[] => {
  return servers.slice().sort((a, b) => {
    switch (orderBy) {
      case ServerOrderBy.Name:
        return a.fullName.localeCompare(b.fullName)
      default:
        return 0 // No filtering if an unknown filter type is provided
    }
  })
}
