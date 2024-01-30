import { useBoundStore } from '@renderer/stores/store'
import { TOrder } from '@renderer/types/type-schema'
import _ from 'lodash'
import { SwiperSlide } from 'swiper/react'
import { TSlider } from '../Categories'
import CarouselWrapper from '../carousel/carousel-wrapper'
import OrderItem from './item/item'
import NoData from '../no-data/orders/no-data'
import useOrders from '@renderer/api/hooks/useOrders'
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate'

const organizeDataIntoSlider = (data: any): TSlider[] => {
  const chunkSize = 6
  const chunkedOrders: TOrder[] = _.chunk(data, chunkSize)
  return _.map(chunkedOrders, (chunk, index) => ({
    tabNumber: index + 1,
    items: chunk[0].items
  }))
}
function filterObjectsByTodayDate(array) {
  // Get today's date
  const today = new Date()
  const todayDate = today.toISOString().split('T')[0]
  const filteredArray = array.filter((obj) => {
    const objDate = obj.createdAt.split('T')[0]
    return objDate === todayDate
  })

  return filteredArray
}
function filterObjectsByStatus(array, status) {
  const filteredArray = array.filter((obj) => {
    return obj.status === status
  })

  return filteredArray
}

const Orders = () => {
  const currentOrder = useBoundStore((state) => state.currentOrder)
  const axiosInstance = useAxiosPrivate()
  let data: TOrder[] = []
  if (currentOrder !== null) {
    data = [currentOrder!]
  }
  const { data: orderData } = useOrders(axiosInstance)

  const orders = orderData?.data.data
  if (orders) {
    console.log('-----orders-----', orders)
    const todayOrders = filterObjectsByTodayDate(orders)
    console.log('-----TodayOrders-----', todayOrders)
    const pendingOrders = filterObjectsByStatus(todayOrders, 'PENDING')
    console.log('-----pendingOrders-----', pendingOrders)
  }

  const sliderData: TSlider[] = organizeDataIntoSlider(data)
  return (
    <div className="h-full w-full ">
      {sliderData.length > 0 ? (
        <CarouselWrapper className="">
          {sliderData.map((item: any) => (
            <SwiperSlide key={item.tableNumber}>
              <div className="h-full  w-full flex flex-col  justify-between">
                <OrderItem order={item} />
              </div>
            </SwiperSlide>
          ))}
        </CarouselWrapper>
      ) : (
        <NoData content="No Orders" />
      )}
    </div>
  )
}

export default Orders
