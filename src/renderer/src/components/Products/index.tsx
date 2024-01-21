import { TProduct } from '@renderer/types/type-schema'
import useProducts from '../../api/hooks/useProducts'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Orders from '../Orders'
import ProductItem from './item-list'
import { useBoundStore } from '@renderer/stores/store'

const Products = () => {
  const axiosInstance = useAxiosPrivate()
  const { productFilterKey } = useBoundStore((state) => state)
  const { data: products, error, isLoading } = useProducts(axiosInstance, productFilterKey)

  const getSafeProductList = (data: any): TProduct[] => {
    if (Array.isArray(data)) {
      return data
    } else if (data && 'data' in data) {
      return data.data.data || []
    } else {
      return []
    }
  }
  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (error) return <p>Error: {error.message} </p>
  const productList: TProduct[] = getSafeProductList(products)
  if (!products) return null
  return (
    <div className="flex h-full">
      <div className="w-2/3 grow grid grid-cols-12 gap-5 pt-5 mt-5 border-t overflow-y-scroll h-full ">
        {productList?.map((item, fakerKey) => <ProductItem key={fakerKey} item={item} />)}
      </div>
      <div className="w-1/3 h-[670px]  overflow-y-scroll">
        <Orders />
      </div>
    </div>
  )
}

export default Products
