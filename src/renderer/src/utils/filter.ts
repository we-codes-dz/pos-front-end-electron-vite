import { TCategory, TProduct } from '@renderer/types/type-schema'

export enum CategoryOrderBy {
  Name = 'name',
  Empty = ''
}

export enum ProductOrderBy {
  Name = 'name',
  Price = 'Price',
  Empty = ''
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
