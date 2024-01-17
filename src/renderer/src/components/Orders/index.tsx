import { SwiperSlide } from "swiper/react"
import CarouselWrapper from "../carousel/carousel-wrapper"
import OrderItem from "./item/item"
import { TOrderList, tableCommandData } from "@renderer/data/tableCommandData"

const Orders =
    () => {
        return (
            <div className="h-full w-full ">
                <CarouselWrapper className="">
                    {tableCommandData.map((item: TOrderList) =>
                        <SwiperSlide key={item.tableNumber} >
                            <div className="h-full  w-full flex flex-col  justify-between">
                                <OrderItem order={item} />
                            </div>
                        </SwiperSlide>
                    )}
                </CarouselWrapper>
            </div>
        )
    }

export default Orders