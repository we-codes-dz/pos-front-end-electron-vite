import { TProduct } from '@renderer/types/type-schema'
import useProducts from '../../api/hooks/useProducts'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import ProductItem from './item-list'
import { useBoundStore } from '@renderer/stores/store'
import { Tab, Tabs } from '@nextui-org/react'
import { shallow } from 'zustand/shallow'
import Indicator from '../indicator/indicator'
import Orders from '../Orders'
import PendingOrders from '../pending-order'

const Products = () => {
  const axiosInstance = useAxiosPrivate()
  const [
    productFilterKey,
    pendingOrders
  ] = useBoundStore((state) => [
    state.productFilterKey, state.pendingOrders
  ], shallow)
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
      <div className="w-7/12 grow grid grid-cols-12 gap-5 pt-5 mt-5 border-t overflow-y-scroll h-full ">
        {productList?.map((item, fakerKey) => <ProductItem key={fakerKey} item={item} />)}
      </div>
      <div className="w-5/12 h-[680px] text-center">
        <Tabs color="warning">
          <Tab key="current-order" title={
            <div className='font-semibold'>Current Order</div>
          }>
            <div className='text-left h-[650px] '>
              <Orders />
            </div>
          </Tab>
          <Tab key="pending" title={
            <div className="relative z-50">
              {pendingOrders && pendingOrders?.length > 0 && <Indicator className='absolute -top-2 -right-4' indicatorNumber={pendingOrders?.length} />}
              <div className='font-semibold'>Pending</div>
            </div>
          }>
            <div className='text-left h-[650px] '>
              <PendingOrders />
            </div>
          </Tab>
          <Tab key="to-kitchen" title="To Kitchen">
            <Orders />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default Products
