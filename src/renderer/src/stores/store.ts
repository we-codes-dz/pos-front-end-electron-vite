import { create } from "zustand";
import { ProductSlice, createProductSlice } from "./slices/productSlice";
import { CategorySlice, createCategorySlice } from "./slices/categorySlice";
import { TableSlice, createTableSlice } from "./slices/tableStore";
import { AuthState, createAuthSlice } from "./slices/authSlice";

type RootState = ProductSlice & CategorySlice & TableSlice & AuthState;

export const useBoundStore = create<RootState>()((...a) => ({
  ...createCategorySlice(...a),
  ...createProductSlice(...a),
  ...createTableSlice(...a),
  ...createAuthSlice(...a),
}));
