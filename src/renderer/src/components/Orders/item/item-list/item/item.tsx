import { useBoundStore } from '@renderer/stores/store'
import { useCallback, useState } from 'react'
import { TOrderItem } from '../../../../../data/tableCommandData'
import Controller from './controller/controller'
import ProductInformation from './product-information'
import Total from './total'

type TProps = {
  item: TOrderItem
  setSelectProductId: (id: number) => void
}
const Item = ({ item, setSelectProductId }: TProps) => {
  const [quantity, setQuantity] = useState<number>(item.quantity)

  const { deleteItemFromCurrentOrder, updateItemQuantity } = useBoundStore((state) => state)

  const handleQuantityChange =
    useCallback((newQuantity: number) => {
      setQuantity(newQuantity)
      updateItemQuantity(item.product.id, newQuantity)
    }, [updateItemQuantity, item.product.id])

  const addQuantity = () => handleQuantityChange(quantity + 1)

  const minusQuantity = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1)
    }
  }

  const deleteItem = () => {
    deleteItemFromCurrentOrder(item.product.id)
  }

  return (
    <div className="flex flex-col  rounded-md relative border-2" onClick={() => setSelectProductId(item.product.id)}>
      {/*/  //? delete command button*/}
      <div className="absolute top-1 right-1">
        <div
          className="flex justify-center items-center rounded-full p-2 h-4 w-4 text-white text-sm bg-red-500"
          onClick={deleteItem}
        >
          x
        </div>
      </div>
      <ProductInformation item={item} />
      {/* //? total of the item **/}
      <div className="w-ful  flex justify-between pl-2 pb-2">
        <Controller addQuantity={addQuantity} minusQuantity={minusQuantity} quantity={quantity} />
        <Total price={item.price} quantity={quantity} />
      </div>
    </div>
  )
}

export default Item
