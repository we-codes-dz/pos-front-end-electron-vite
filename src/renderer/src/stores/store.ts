import { create } from 'zustand'
import { ProductSlice, createProductSlice } from './slices/productSlice'
import { CategorySlice, createCategorySlice } from './slices/categorySlice'
import { TableSlice, createTableSlice } from './slices/tableStore'
import { AuthState, createAuthSlice } from './slices/authSlice'
import { OrderSlice, createOrderSlice } from './slices/orderSlice'

type RootState = ProductSlice & CategorySlice & TableSlice & AuthState & OrderSlice

export const useBoundStore = create<RootState>()((...a) => ({
  ...createCategorySlice(...a),
  ...createProductSlice(...a),
  ...createTableSlice(...a),
  ...createAuthSlice(...a),
  ...createOrderSlice(...a)
}))
