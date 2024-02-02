import { useBoundStore } from '@renderer/stores/store'
import { TOrder } from '@renderer/types/type-schema'
import _ from 'lodash'
import { SwiperSlide } from 'swiper/react'
import { TSlider } from '../Categories'
import CarouselWrapper from '../carousel/carousel-wrapper'
import NoData from '../no-data/orders/no-data'
import OrderItem from '../Orders/item/item'

const organizeDataIntoSlider = (data: any): TSlider[] => {
  const chunkedOrders: TOrder[] = _.chunk(data)
  return _.map(chunkedOrders, (chunk, index) => ({
    tabNumber: index + 1,
    items: chunk[0].items
  }))
}

const PendingOrders = () => {
  const pendingOrder = useBoundStore((state) => state.pendingOrders)
  const data = pendingOrder

  const sliderData: TSlider[] = organizeDataIntoSlider(data)
  if (!sliderData) return null
  console.log('slider Data :', sliderData)
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
        <NoData content="No Pending Orders" />
      )}
    </div>
  )
}

export default PendingOrders
