import { TProduct, TProductFilter } from '@renderer/types/type-schema'
import { StateCreator } from 'zustand'

export interface ProductSlice {
  products: TProduct[]
  productFilterKey: TProductFilter
  isProductsMounted: boolean
  setProductFilterKey: (productFilterKey: TProductFilter) => void
  addProduct: (product: TProduct) => void
  setProducts: (products: TProduct[]) => void
  setCategory: (productId: number, categoryId: number) => void
  fetchProducts: (url: string) => Promise<void>
  setProductsMounted: (isMounted: boolean) => void
}

export const createProductSlice: StateCreator<ProductSlice> = (set) => ({
  products: [],
  productFilterKey: { 'filter.categoryId': null, pageParam: null, pageSize: null },
  setProductFilterKey: (productFilterKey: TProductFilter) => set({ productFilterKey }),
  isProductsMounted: false,
  fetchProducts: async (url: string) => {
    const response = await fetch(url)
    set({ products: (await response.json()) as TProduct[] })
  },
  addProduct: (product: TProduct) =>
    set((state: ProductSlice) => ({ products: [...state.products, product] })),

  setProducts: (products: TProduct[]) => set({ products }),

  setCategory: (productId: number, categoryId: number) => {
    set((state: ProductSlice) => {
      const product: TProduct = state.products.find((p) => p.id === productId)!
      return {
        products: state.products.map((p) =>
          p.id === productId ? { ...product, category: categoryId } : p
        )
      }
    })
  },
  setProductsMounted: (isMounted: boolean) => set({ isProductsMounted: isMounted })
})

/*export const productSlice =
    (set: any) => ({
        ...createFetchStore<ProductState>(set),

        products: [],

        addProduct: (product: TProduct) =>
            set((state: ProductState) => ({ products: [...state.products, product] })),

        setProducts: (products: TProduct[]) => set({ products }),

        setCategory: (productId: number, categoryId: number) => {
            set((state: ProductState) => {
                const product: TProduct = state.products.find(p => p.id === productId)!;
                return {
                    products: state.products.map(p =>
                        p.id === productId
                            ? { ...product, category: categoryId }
                            : p
                    )
                };
            });
        }
    })


/*
export const useProductStore =
create<ProductState & StoreWithFetch<ProductState>>(set => ({
    ...createFetchStore(set),
    products: [],
    addProduct: (product: TProduct) =>
        set(state => ({ products: [...state.products, product] })),
    setProducts: (products: TProduct[]) => set({ products }),
    setCategory: (productId: number, categoryId: number) => {
        set(state => {
            const product: TProduct = state.products.find(p => p.id === productId)!;
            return {
                products: state.products.map(p =>
                    p.id === productId
                        ? { ...product, category: categoryId }
                        : p
                )
            };
        });
    }
}));
*/
