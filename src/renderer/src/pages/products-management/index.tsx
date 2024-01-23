import { usePaginateProducts } from '@renderer/api/hooks/useProducts'
import ProductTable from '@renderer/components/table/product/product-table'
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate'
import { TProduct } from '@renderer/types/type-schema'
import { columnHeaders } from './columns'


const ProductsPage = () => {
  const axiosInstance = useAxiosPrivate()
  //   const { data: products, isLoading } = useProducts(axiosInstance)
  const { data: products, isLoading } = usePaginateProducts(axiosInstance)
  if (isLoading) return null
  const structuringData =
    (products: any): TProduct[] => {
      const data = products?.data?.data ? products?.data?.data : products
      return data
    }
  const structuredProduct: TProduct[] = structuringData(products)
  return (
    <div className="flex flex-col w-full overflow-y-scroll">
      <ProductTable
        axiosInstance={axiosInstance}
        headers={columnHeaders}
        products={structuredProduct} />
    </div>
  )
}

export default ProductsPage
