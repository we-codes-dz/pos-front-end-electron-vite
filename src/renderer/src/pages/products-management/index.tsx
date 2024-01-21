import useProducts from "@renderer/api/hooks/useProducts";
import ProductTable from "@renderer/components/table/product/product-table";
import useAxiosPrivate from "@renderer/hooks/useAxiosPrivate";
import { TProduct, TProductColumn } from "@renderer/types/type-schema";



const columnHeaders: TProductColumn[] = [
    {
        key: "name",
        label: "Product Name"
    },
    {
        key: "description",
        label: "Product Description"
    },
    {
        key: "price",
        label: "Price"
    },
    {
        key: "category",
        label: "Category"
    },
    {
        key: "actions",
        label: "Actions"
    }
];
const ProductsPage = () => {

    const axiosInstance = useAxiosPrivate();
    const { data: products, isLoading } = useProducts(axiosInstance);

    if (isLoading) return null
    const structuringData =
        (products: any): TProduct[] => {
            return products.data.data;
        }
    const structuredProduct: TProduct[] = structuringData(products)
    return (
        <div className="flex flex-col w-full overflow-y-scroll">
            <ProductTable
                headers={columnHeaders}
                products={structuredProduct}
            />
        </div>
    )
}

export default ProductsPage