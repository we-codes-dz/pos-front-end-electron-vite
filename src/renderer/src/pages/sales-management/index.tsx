import useSales from "@renderer/api/hooks/useSales";
import SalesTable from "@renderer/components/table/sales/sale-table";
import useAxiosPrivate from "@renderer/hooks/useAxiosPrivate";
import { columnHeaders } from "./columns";


const ProductsPage = () => {

    const axiosInstance = useAxiosPrivate();
    const { data: sales, isLoading } = useSales(axiosInstance);

    if (isLoading) return null

    const structuringData =
        (sales: any) => {
            return sales.data.data;
        }
    const structuredSales = structuringData(sales)
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