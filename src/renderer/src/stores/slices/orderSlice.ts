import { TItem, TOrder } from '@renderer/types/type-schema'
import { StateCreator } from 'zustand'

export interface OrderSlice {
  currentOrder: TOrder | null
  orders: TOrder[]
  isOrderMounted: boolean
  todayOrders: TOrder[]
  addProductToCurrentOrder: (product: TItem) => void
  deleteItemFromCurrentOrder: (itemId: number) => void
  setOrders: (products: TOrder[]) => void
}

export const createOrderSlice: StateCreator<OrderSlice> = (set) => ({
  currentOrder: null,
  orders: [],
  todayOrders: [],
  isOrderMounted: false,
  addProductToCurrentOrder: (item: TItem) =>
    set((state: OrderSlice) => {
      if (state.currentOrder) {
        const itemExists = state.currentOrder.items.some(
          (existingItem) => existingItem.product.id === item.product.id
        )

        if (itemExists) {
          // If the item already exists, do nothing
          return state
        }
        // If there is a current order, add the item to its 'items' array
        return {
          currentOrder: {
            ...state.currentOrder,
            items: [...state.currentOrder.items, item]
          },
          orders: [...state.orders]
        }
      } else {
        // If there is no current order, create a new one with the provided item
        return {
          currentOrder: {
            id: 0, // You might need to generate a unique ID
            total: 0, // You might need to calculate the total based on the items
            table: [], // You might need to handle the table property appropriately
            server: { id: 0 }, // You might need to handle the server property appropriately
            items: [item], // Add the provided item to the items array
            createdAt: '',
            updatedAt: '',
            deletedAt: ''
          },
          orders: [...state.orders]
        }
      }
    }),

  setOrders: (orders: TOrder[]) => set({ orders }),

  deleteItemFromCurrentOrder: (itemId: number) =>
    set((state: OrderSlice) => {
      if (state.currentOrder) {
        // If there is a current order, filter out the item with the provided ID
        const updatedItems = state.currentOrder.items.filter((item) => item.product.id !== itemId)

        // Update the currentOrder with the filtered items
        const updatedOrder = {
          ...state.currentOrder,
          items: updatedItems
        }

        return {
          currentOrder: updatedOrder,
          orders: [...state.orders]
        }
      } else {
        // If there is no current order, do nothing
        return state
      }
    })
})
