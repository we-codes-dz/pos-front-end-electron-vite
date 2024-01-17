import useCategories from "@renderer/api/hooks/useCategories";
import useAxiosPrivate from "@renderer/hooks/useAxiosPrivate";
import { TCategory } from "@renderer/types/type-schema";
import _ from "lodash";
import { SwiperSlide } from "swiper/react";
import CarouselWrapper from "../carousel/carousel-wrapper";
import SliderElement from "../carousel/slider";

type TContentSlider = {
  name: string;
  image_url: string;
};

type TSlider = {
  tabNumber: number;
  content: TContentSlider[];
};
const Categories = () => {

  const axiosInstance = useAxiosPrivate();

  const { data: categories, isLoading } = useCategories(axiosInstance);
  console.log(categories);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const organizeDataIntoSlider = (categories: any): TSlider[] => {
    const chunkSize = 6;
    const chunkedCategories: TCategory[][] = _.chunk(
      categories.data.data,
      chunkSize
    );
    return _.map(chunkedCategories, (chunk, index) => ({
      tabNumber: index + 1,
      content: _.map(chunk, (cat) => ({
        name: cat.name,
        image_url: cat.avatar?.url || "",
      })),
    }));
  };
  const sliderData: TSlider[] = organizeDataIntoSlider(categories);

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
  );
};

export default Categories;
