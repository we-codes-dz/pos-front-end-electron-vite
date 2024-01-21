import useSales from "@renderer/api/hooks/useSales";
import SalesTable from "@renderer/components/table/sales/sale-table";
import useAxiosPrivate from "@renderer/hooks/useAxiosPrivate";
import { TProductColumn } from "@renderer/types/type-schema";



const columnHeaders: TProductColumn[] = [
    {
        key: "table",
        label: "Table"
    },
    {
        key: "total",
        label: "Total"
    },
    {
        key: "createdAt",
        label: "Date"
    },
    {
        key: "action",
        label: "Actions"
    }
];
const ProductsPage = () => {

    const axiosInstance = useAxiosPrivate();
    const { data: sales, isLoading } = useSales(axiosInstance);

    if (isLoading) return null
    console.log(sales)

    const structuringData =
        (sales: any) => {
            return sales.data.data;
        }
    const structuredSales = structuringData(sales)
    console.log(structuredSales)
    return (
        <div className="flex flex-col w-full overflow-y-scroll">
            <SalesTable
                headers={columnHeaders}
                sales={structuredSales}
            />
        </div>
    )
}

export default ProductsPage