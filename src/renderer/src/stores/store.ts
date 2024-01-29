import { create } from 'zustand'
import { ProductSlice, createProductSlice } from './slices/productSlice'
import { CategorySlice, createCategorySlice } from './slices/categorySlice'
import { TableSlice, createTableSlice } from './slices/tableStore'
import { AuthState, createAuthSlice } from './slices/authSlice'
import { OrderSlice, createOrderSlice } from './slices/orderSlice'
import { noteModalSlice, createNoteModalSlice } from './slices/noteModalSlice'
import { adsOnModalSlice, createAdsOnModalSlice } from './slices/adsOnModalSlice'
import {
  processToPaymentModalSlice,
  createProcessToPaymentModalSlice
} from './slices/processToPaymentModalSlice'

type RootState = ProductSlice &
  CategorySlice &
  TableSlice &
  AuthState &
  OrderSlice &
  noteModalSlice &
  adsOnModalSlice &
  processToPaymentModalSlice

export const useBoundStore = create<RootState>()((...a) => ({
  ...createCategorySlice(...a),
  ...createProductSlice(...a),
  ...createTableSlice(...a),
  ...createAuthSlice(...a),
  ...createOrderSlice(...a),
  ...createNoteModalSlice(...a),
  ...createAdsOnModalSlice(...a),
  ...createProcessToPaymentModalSlice(...a)
}))
