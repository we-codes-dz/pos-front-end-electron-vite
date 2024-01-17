import { StateCreator } from 'zustand';
import { TCategory, TProduct } from '../../types/schema';

export interface CategorySlice {
    categories: TCategory[];
    isCategoriesMounted: boolean;
    fetchCategories: (url: string) => Promise<void>;
    addCategory: (category: TCategory) => void;
    setCategories: (categories: TCategory[]) => void;
    addProductToCategory: (categoryId: number, product: TProduct) => void;
    setCategoriesMounted: (isMounted: boolean) => void;
}

export const createCategorySlice: StateCreator<CategorySlice> =
    (set) => ({
        categories: [],
        isCategoriesMounted: false,
        fetchCategories: async (url: string) => {
            const response = await fetch(url);
            set({ categories: (await response.json()) as TCategory[] });
        },
        addCategory: (category: TCategory) =>
            set(state => ({ categories: [...state.categories, category] })),
        setCategories: (categories: TCategory[]) => set({ categories }),
        addProductToCategory: (categoryId: number, product: TProduct) => {
            set((state) => {
                const category: TCategory = state.categories.find(c => c.id === categoryId)!;
                return {
                    categories: state.categories.map(c =>
                        c.id === categoryId
                            ? { ...category, products: category.products }
                            : c
                    )
                };
            })
        },
        setCategoriesMounted: (isMounted: boolean) => set({ isCategoriesMounted: isMounted })
    })