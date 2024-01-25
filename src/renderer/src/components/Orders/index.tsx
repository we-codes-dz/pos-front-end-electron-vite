import { useBoundStore } from '@renderer/stores/store'
import { TOrder } from '@renderer/types/type-schema'
import _ from 'lodash'
import { SwiperSlide } from 'swiper/react'
import { TSlider } from '../Categories'
import CarouselWrapper from '../carousel/carousel-wrapper'
import OrderItem from './item/item'

const organizeDataIntoSlider = (data: any): TSlider[] => {
  const chunkSize = 6
  const chunkedOrders: TOrder[] = _.chunk(data, chunkSize)
  return _.map(chunkedOrders, (chunk, index) => ({
    tabNumber: index + 1,
    items: chunk[0].items
  }))
}

const Orders = () => {
  const { currentOrder } = useBoundStore((state) => state)
  let data: TOrder[] = []
  if (currentOrder !== null) {
    data = [currentOrder!]
  }

  const sliderData: TSlider[] = organizeDataIntoSlider(data)

  return (
    <div className="h-full w-full ">
      <CarouselWrapper className="">
        {sliderData.map((item: any) => (
          <SwiperSlide key={item.tableNumber}>
            <div className="h-full  w-full flex flex-col  justify-between">
              <OrderItem order={item} />
            </div>
          </SwiperSlide>
        ))}
      </CarouselWrapper>
    </div>
  )
}

export default Orders
