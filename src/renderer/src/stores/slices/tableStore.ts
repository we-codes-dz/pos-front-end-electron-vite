import { TOrder, TTable } from '@renderer/types/type-schema'
import { StateCreator } from 'zustand'

export interface TableSlice {
  tables: TTable[]
  isTablesMounted: boolean
  fetchTables: (url: string) => Promise<void>
  addTable: (table: TTable) => void
  setTables: (tables: TTable[]) => void
  addOrderToTable: (tableId: number, order: TOrder) => void
  setTablesMounted: (isMounted: boolean) => void
}

export const createTableSlice: StateCreator<TableSlice> = (set) => ({
  tables: [],
  isTablesMounted: false,
  fetchTables: async (url: string) => {
    const response = await fetch(url)
    set({ tables: (await response.json()) as TTable[] })
  },
  addTable: (table: TTable) => set((state) => ({ tables: [...state.tables, table] })),
  setTables: (tables: TTable[]) => set({ tables }),
  addOrderToTable: (tableId: number) => {
    set((state) => {
      const table: TTable = state.tables.find((t) => t.id === tableId)!
      return {
        tables: state.tables.map(
          (t) => (t.id === tableId ? { ...table } : t) //TODO : adding orders
        )
      }
    })
  },
  setTablesMounted: (isMounted: boolean) => set({ isTablesMounted: isMounted })
})
