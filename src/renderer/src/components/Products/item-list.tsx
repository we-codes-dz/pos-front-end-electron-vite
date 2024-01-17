import { TProduct } from "@renderer/types/type-schema";
import { BASE_URL } from "../../utils/constants";
type TProps = {
  item: TProduct;
};
const ProductItem = ({ item }: TProps) => {
  return (
    <div className="col-span-12 intro-y sm:col-span-4 2xl:col-span-3 bg-white h-60 hover:scale-105">
      <div className="relative p-3 rounded-md box zoom-in">
        <div className="">
          <div className="w-full h-full">
            <img
              alt="Midone Tailwind HTML Admin Template"
              className="rounded-md "
              src={BASE_URL + item.avatar?.url}
            />
          </div>
        </div>
        <div className="block mt-3 font-medium text-center truncate ">
          {item.name}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
