import CategoryTable from '@renderer/components/table/category/categoryTable'
import { categoryColumns } from './columns'
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate';
import useCategories from '@renderer/api/hooks/useCategories';
import { TCategory } from '@renderer/types/type-schema';


const index = () => {
    const axiosInstance = useAxiosPrivate();

    const { data: categories, isLoading } = useCategories(axiosInstance);

    if (isLoading) return null
    const structuringData =
        (categories: any): TCategory[] => {
            return categories.data.data;
        }

    const structuredCategory = structuringData(categories) as TCategory[];
    return (
        <div className="flex flex-col w-full">
            <CategoryTable categoryColumns={categoryColumns} categories={structuredCategory} />
        </div>
    )
}

export default index