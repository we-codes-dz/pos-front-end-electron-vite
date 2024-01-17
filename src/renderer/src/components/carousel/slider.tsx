import { BASE_URL } from "../../utils/constants";

type TCategory = {
    name: string;
    image_url: string;
}
type TProps = {
    tabNumber: number;
    element: TCategory;
}
const SliderElement =
    ({ element, tabNumber }: TProps) => {
        return (
            <div id={tabNumber.toString()}
                className='w-32 flex  items-center shadow-slate-300 shadow-md rounded'
            >
                <img src={BASE_URL + element.image_url} className="h-14 w-16 rounded " />
                <div className='flex justify-center w-full text-sm'>{element.name}</div>
            </div>
        )
    }

export default SliderElement