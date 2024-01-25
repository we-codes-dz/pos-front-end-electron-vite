import { randomNumbers } from '@renderer/utils/helper'
import { TOrderItem } from '../../../../data/tableCommandData'
import Item from './item/item'
type TProps = {
  itemList: TOrderItem[]
  setSelectProductId: (id: number) => void
}
const ItemList = ({ itemList, setSelectProductId }: TProps) => {
  return (
    <div className="px-1.5 py-4 mt-5 overflow-y-scroll h-full w-full space-y-2">
      {itemList.map((item) => (
        <Item key={`${item.product.name}-${randomNumbers(1, 10, 2)}`} item={item} setSelectProductId={setSelectProductId} />
      ))}
    </div>
  )
}

export default ItemList
