import useCategories from '@renderer/api/hooks/useCategories'
import CategoryTable from '@renderer/components/table/category/category-table'
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate'
import { TCategory } from '@renderer/types/type-schema'
import { categoryColumns } from './columns'

const index = () => {
  const axiosInstance = useAxiosPrivate()

  const { data: categories, isLoading } = useCategories(axiosInstance)

  if (isLoading) return null
  const structuringData =
    (categories: any): TCategory[] => {
      const data = categories?.data?.data ? categories?.data?.data : categories
      return data
    }
  const structuredCategory = structuringData(categories) as TCategory[]
  return (
    <div className="flex flex-col w-full">
      <CategoryTable
        axiosInstance={axiosInstance}
        categoryColumns={categoryColumns}
        categories={structuredCategory}
      />
    </div>
  )
}

export default index
