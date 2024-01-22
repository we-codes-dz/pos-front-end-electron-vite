import _ from 'lodash'
import { SwiperSlide } from 'swiper/react'
import useCategories from '../../api/hooks/useCategories'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { TCategory } from '../../types/type-schema'
import CarouselWrapper from '../carousel/carousel-wrapper'
import SliderElement from '../carousel/slider'

type TContentSlider = {
  id: number
  name: string
  image_url: string
}

type TSlider = {
  tabNumber: number
  content: TContentSlider[]
}
const Categories = () => {
  const axiosInstance = useAxiosPrivate()

  const { data: categories, error, isLoading } = useCategories(axiosInstance)

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (error) return <div>{error.message}</div>
  const organizeDataIntoSlider = (categories: any): TSlider[] => {
    const data = categories?.data?.data ? categories?.data?.data : categories
    const chunkSize = 6
    const chunkedCategories: TCategory[][] = _.chunk(data, chunkSize)
    return _.map(chunkedCategories, (chunk, index) => ({
      tabNumber: index + 1,
      content: _.map(chunk, (cat) => ({
        id: cat.id,
        name: cat.name,
        image_url: cat.avatar?.url || ''
      }))
    }))
  }
  const sliderData: TSlider[] = organizeDataIntoSlider(categories)

  return (
    <div className="w-40 full rounded-md overflow-hidden relative py-1">
      <CarouselWrapper>
        {sliderData?.map((item, index) => (
          <SwiperSlide key={item?.tabNumber}>
            <div
              key={index}
              className=" relative h-full  w-full flex flex-col justify-center gap-2 items-center px-6 py-4"
            >
              {item?.content.map((it, index) => (
                <div key={index}>
                  <SliderElement element={it} tabNumber={item.tabNumber} />
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </CarouselWrapper>
    </div>
  )
}

export default Categories
