import { TSlider } from '@renderer/components/Categories'
import CarouselWrapper from '@renderer/components/carousel/carousel-wrapper'
import { useBoundStore } from '@renderer/stores/store'
import { TOrder } from '@renderer/types/type-schema'
import _ from 'lodash'
import { SwiperSlide } from 'swiper/react'
import OrderItem from '../item/item'
import NoData from '@renderer/components/no-data/orders/no-data'


const organizeDataIntoSlider = (data: any): TSlider[] => {
  const chunkSize = 6
  const chunkedOrders: TOrder[] = _.chunk(data, chunkSize)
  return _.map(chunkedOrders, (chunk, index) => ({
    tabNumber: index + 1,
    items: chunk[0].items
  }))
}

const CurrentOrders = () => {
  const currentOrder = useBoundStore((state) => state.currentOrder)
  let data: TOrder[] = []
  if (currentOrder !== null) {
    data = [currentOrder!]
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

export default CurrentOrders
