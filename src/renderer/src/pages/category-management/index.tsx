import CategoryTable from '@renderer/components/table/category/categoryTable'
import { categoryColumns } from './columns'
import { useBoundStore } from '@renderer/stores/store'

const index = () => {
    const { categories } = useBoundStore(set => set);

    return (
        <div className="flex flex-col w-full">
            <CategoryTable categoryColumns={categoryColumns} categories={categories} />
        </div>
    )
}

export default index