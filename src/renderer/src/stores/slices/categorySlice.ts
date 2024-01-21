import { TCategory, TCategoryFilter, TProduct } from '@renderer/types/type-schema'
import { StateCreator } from 'zustand'

export interface CategorySlice {
  categories: TCategory[]
  categoryFilterKey: TCategoryFilter
  setCategoryFilterKey: (key: TCategoryFilter) => void
  isCategoriesMounted: boolean
  fetchCategories: (url: string) => Promise<void>
  addCategory: (category: TCategory) => void
  setCategories: (categories: TCategory[]) => void
  addProductToCategory: (categoryId: number, product: TProduct) => void
  setCategoriesMounted: (isMounted: boolean) => void
}

export const createCategorySlice: StateCreator<CategorySlice> = (set) => ({
  categories: [],
  isCategoriesMounted: false,
  categoryFilterKey: { page: 1, limit: 2 },
  setCategoryFilterKey: (categoryFilterKey: TCategoryFilter) => set({ categoryFilterKey }),
  fetchCategories: async (url: string) => {
    const response = await fetch(url)
    set({ categories: (await response.json()) as TCategory[] })
  },
  addCategory: (category: TCategory) =>
    set((state) => ({ categories: [...state.categories, category] })),
  setCategories: (categories: TCategory[]) => set({ categories }),
  addProductToCategory: (categoryId: number, product: TProduct) => {
    set((state) => {
      const category: TCategory = state.categories.find((c) => c.id === categoryId)!
      return {
        categories: state.categories.map((c) =>
          c.id === categoryId ? { ...category, products: [...category.products!, product] } : c
        )
      }
    })
  },
  setCategoriesMounted: (isMounted: boolean) => set({ isCategoriesMounted: isMounted })
})
