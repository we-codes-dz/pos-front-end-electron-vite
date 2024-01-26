import { ColumnHeaderInt } from '@renderer/components/table/sales/sale-table'

export interface CategoryColumnInt {
  key: number
  label: string
}
export const categoryColumns: ColumnHeaderInt[] = [
  {
    key: '1',
    label: 'Name'
  },
  {
    key: '2',
    label: 'Parent'
  },
  {
    key: '3',
    label: 'Actions'
  }
]
