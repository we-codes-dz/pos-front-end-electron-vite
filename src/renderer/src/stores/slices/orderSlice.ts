import { TItem, TOrder } from '@renderer/types/type-schema'
import { getAddOnsFromCurrentOrders } from '@renderer/utils/helper'

import { StateCreator } from 'zustand'

export interface OrderSlice {
  currentOrder: TOrder | null
  orders: TOrder[]
  pendingOrders: TOrder[]
  isOrderMounted: boolean
  todayOrders: TOrder[]
  //? note & adds on management var
  selectProductId: number
  isItemChosen: boolean
  currentAddOns: string[] | null
  //? payment management var
  total: number
  addProductToCurrentOrder: (product: TItem) => void
  addProductToPendingOrders: (order: TOrder) => void
  deleteItemFromCurrentOrder: (itemId: number) => void
  setOrders: (products: TOrder[]) => void
  clearCurrentOrder: () => void
  updateItemQuantity: (itemId: number, quantity: number) => void
  updateItemPrice: (itemId: number, price: number) => void
  addNoteToProduct: (productId: number, note: string) => void
  //? note & adds on management functions
  setSelectProductId: (id: number) => void
  setIsItemChosen: (bool: boolean) => void
  addAddOns: (productId: number, newAddOn: string) => void
  clearSpecificAddon: (productId: number, newAddOn: string) => void
  getSpecificProductAddOns: (productId: number) => void
  clearSpecificProductSupplies: (productId: number) => void
  setTotal: (total: number) => void
}

export const createOrderSlice: StateCreator<OrderSlice> = (set) => ({
  currentOrder: null,
  orders: [],
  todayOrders: [],
  pendingOrders: [],
  isOrderMounted: false,
  //? note & adds on management var
  selectProductId: 0,
  isItemChosen: false,
  currentAddOns: [],
  total: 0,

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
            table: {
              // You might need to handle the table property appropriately
              id: 0,
              floor: 0,
              number: 0,
              isAvailable: false,
              maxSeats: 0,
              usedSeats: 0,
              orders: undefined
            },
            server: { id: 0 }, // You might need to handle the server property appropriately
            items: [item], // Add the provided item to the items array
            createdAt: '',
            updatedAt: '',
            deletedAt: '',
            currentAddOns: []
          },
          orders: [...state.orders]
        }
      }
    }),
  addProductToPendingOrders: (order: TOrder) =>
    set((state: OrderSlice) => ({
      pendingOrders: [...state.pendingOrders, order]
    })),
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
    }),

  clearCurrentOrder: () =>
    set((state: OrderSlice) => {
      if (state.currentOrder) {
        // If there is a current order, set its 'items' array to an empty array
        const updatedOrder = {
          ...state.currentOrder,
          items: []
        }

        return {
          currentOrder: updatedOrder,
          orders: [...state.orders]
        }
      } else {
        // If there is no current order, do nothing
        return state
      }
    }),
  updateItemQuantity: (itemId: number, quantity: number) =>
    set((state: OrderSlice) => {
      if (state.currentOrder) {
        // If there is a current order, update the quantity of the item with the provided ID
        const updatedItems = state.currentOrder.items.map((item) => {
          if (item.product.id === itemId) {
            // Update the quantity of the specific item
            return { ...item, quantity }
          }
          return item
        })

        // Update the currentOrder with the modified items
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
    }),
  updateItemPrice: (itemId: number, price: number) =>
    set((state: OrderSlice) => {
      if (state.currentOrder) {
        // If there is a current order, update the price of the item with the provided ID
        const updatedItems = state.currentOrder.items.map((item) => {
          if (item.product.id === itemId) {
            // Update the price of the specific item
            return { ...item, price }
          }
          return item
        })

        // Update the currentOrder with the modified items
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
    }),
  addNoteToProduct: (productId: number, note: string) =>
    set((state: OrderSlice) => {
      if (state.currentOrder) {
        // If there is a current order, update the note of the product with the provided ID
        const updatedItems = state.currentOrder.items.map((item) => {
          if (item.product.id === productId) {
            // Update the note of the specific product
            return { ...item, note }
          }
          return item
        })

        // Update the currentOrder with the modified items
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
    }),
  addAddOns: (productId: number, newAddOn: string) =>
    set((state: OrderSlice) => {
      if (state.currentOrder) {
        // If there is a current order, find the item with the provided product ID
        const updatedItems: TItem[] = state.currentOrder.items.map((item) => {
          if (item.product.id === productId) {
            // If the item is found, extract existing add-ons and add the new add-on
            const existingAddOns: string[] = item.addOns || []

            // If the new add-on is already selected, remove it (deselect)
            const updatedAddOns: string[] = existingAddOns.includes(newAddOn)
              ? existingAddOns.filter((addOn) => addOn !== newAddOn)
              : [...existingAddOns, newAddOn] // Otherwise, add it

            // Update the add-ons list with the new add-on
            return { ...item, addOns: updatedAddOns }
          }
          return item
        })

        // Update the currentOrder with the modified items
        const updatedOrder = {
          ...state.currentOrder,
          items: updatedItems
        }

        const updatedAddons = getAddOnsFromCurrentOrders(updatedOrder, productId)

        return {
          currentAddOns: updatedAddons,
          currentOrder: updatedOrder,
          orders: [...state.orders]
        }
      } else {
        // If there is no current order, do nothing
        return state
      }
    }),
  clearSpecificAddon: (productId: number, addOn: string) =>
    set((state: OrderSlice) => {
      if (state.currentOrder) {
        // If there is a current order, find the item with the provided product ID
        const updatedItems: TItem[] = state.currentOrder.items.map((item) => {
          if (item.product.id === productId) {
            // If the item is found, extract existing add-ons and remove the specified add-on
            const existingAddOns: string[] = item.addOns || []
            const updatedAddOns: string[] = existingAddOns.filter(
              (existingAddOn) => existingAddOn !== addOn
            )

            // Update the add-ons list with the modified add-ons
            return { ...item, addOns: updatedAddOns }
          }
          return item
        })

        // Update the currentOrder with the modified items
        const updatedOrder = {
          ...state.currentOrder,
          items: updatedItems
        }

        const updatedAddons = getAddOnsFromCurrentOrders(updatedOrder, productId)
        return {
          currentAddOns: updatedAddons,
          currentOrder: updatedOrder,
          orders: [...state.orders]
        }
      } else {
        // If there is no current order, do nothing
        return state
      }
    }),
  clearSpecificProductSupplies: (productId: number) =>
    set((state: OrderSlice) => {
      if (state.currentOrder) {
        // If there is a current order, find the item with the provided product ID
        const updatedItems: TItem[] = state.currentOrder.items.map((item) => {
          if (item.product.id === productId) {
            // If the item is found, remove the supplies related to the specified product
            return { ...item, addOns: [] }
          }
          return item
        })

        // Update the currentOrder with the modified items
        const updatedOrder = {
          ...state.currentOrder,
          items: updatedItems
        }

        const updatedAddons = getAddOnsFromCurrentOrders(updatedOrder, productId)
        return {
          currentAddOns: updatedAddons,
          currentOrder: updatedOrder,
          orders: [...state.orders]
        }
      } else {
        // If there is no current order, do nothing
        return state
      }
    }),
  //? note & adds on management functions declaration
  setSelectProductId: (id: number) => set({ selectProductId: id }),
  setIsItemChosen: (bool: boolean) => set({ isItemChosen: bool }),
  getSpecificProductAddOns: (productId: number) =>
    set((state: OrderSlice) => {
      if (state.currentOrder) {
        // If there is a current order, find the item with the provided product ID
        const foundItem = state.currentOrder.items.find((item) => item.product.id === productId)

        if (foundItem) {
          // If the item is found, retrieve the add-ons and update the specificProductAddOns variable
          const addOns = foundItem.addOns || []
          return { currentAddOns: addOns }
        }
      }

      // If no item is found or there is no current order, set specificProductAddOns to null
      return { currentAddOns: null }
    }),
  setTotal: (total: number) => set({ total: total })
})
