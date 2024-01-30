import { useBoundStore } from '../../stores/store'
import { TProductFilter } from '../../types/type-schema'
import { BASE_URL } from '../../utils/constants'

type TCategory = {
  id: number
  name: string
  image_url: string
}
type TProps = {
  tabNumber: number
  element: TCategory
}
const SliderElement = ({ element, tabNumber }: TProps) => {
  const setProductFilterKey = useBoundStore((state) => state.setProductFilterKey)
  const handleProductList = () => {
    const productFilter: TProductFilter = {
      'filter.categoryId': element.id
    }
    setProductFilterKey(productFilter)
  }
  return (
    <div
      id={tabNumber.toString()}
      className="w-32 flex  items-center shadow-slate-300 shadow-md rounded"
      onClick={handleProductList}
    >
      <img src={BASE_URL + element.image_url} className="h-14 w-16 rounded " />
      <div className="flex justify-center w-full text-sm">{element.name}</div>
    </div>
  )
}

export default SliderElement
