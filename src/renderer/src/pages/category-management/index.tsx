import CategoryTable from '@renderer/components/table/category/category-table'
import { categoryColumns } from './columns'
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate'
import { usePaginateCategories } from '@renderer/api/hooks/useCategories'
import { TCategory } from '@renderer/types/type-schema'
import { useBoundStore } from '@renderer/stores/store'

const index = () => {
  const axiosInstance = useAxiosPrivate()
  const { categoryFilterKey } = useBoundStore((state) => state)

  const { data: categories, isLoading } = usePaginateCategories(axiosInstance, categoryFilterKey)

  if (isLoading) return null
  const structuringData = (categories: any): TCategory[] => {
    return categories.data.data
  }

  const structuredCategory = structuringData(categories) as TCategory[]
  return (
    <div className="flex flex-col w-full">
      <CategoryTable
        axiosInstance={axiosInstance}
        categoryColumns={categoryColumns}
        categories={structuredCategory}
        totalPages={categories.data.meta.totalPages}
      />
    </div>
  )
}

export default index
