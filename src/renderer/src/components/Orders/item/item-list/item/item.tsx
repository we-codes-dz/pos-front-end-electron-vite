import { useBoundStore } from '@renderer/stores/store'
import { useCallback, useEffect, useState } from 'react'
import { TOrderItem } from '../../../../../data/tableCommandData'
import Controller from './controller/controller'
import ProductInformation from './product-information'
import Total from './total'
import { cn } from '@renderer/utils/helper'

type TProps = {
  item: TOrderItem
}
const Item = ({ item }: TProps) => {
  const [quantity, setQuantity] = useState<number>(item.quantity)
  const [className, setClassName] = useState<string>('flex flex-col rounded-md relative border-2');

  const { deleteItemFromCurrentOrder, updateItemQuantity, setSelectProductId, selectProductId, setIsItemChosen, isItemChosen } = useBoundStore((state) => state)

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
    // Check if the item is chosen before allowing deletion
    if (isItemChosen) {
      deleteItemFromCurrentOrder(item.product.id);
      // Additionally, you may want to reset the selection and isItemChosen state after deletion
      setSelectProductId(0); // Assuming 0 is a default value for no selection
      setIsItemChosen(false);
    }
  }

  const itemClickHandler = () => {
    setSelectProductId(item.product.id);
    setIsItemChosen(item.product.id !== selectProductId || !isItemChosen);
  }

  useEffect(() => {
    // The color change logic can be placed here
    // after the state updates are complete
    // Check if the current item is selected and chosen
    const isSelectedAndChosen = item.product.id === selectProductId && isItemChosen;
    // Apply the corresponding class based on the condition
    const newClassName = cn('flex flex-col rounded-md relative border-2', {
      'bg-slate-300 scale-105  ': isSelectedAndChosen,
    });
    // Update the component state with the new class name
    setClassName(newClassName);
  }, [selectProductId, isItemChosen, item.product.id]);
  const shouldRenderDeleteButton = isItemChosen && item.product.id === selectProductId
  return (
    <div
      className={className}
      onClick={itemClickHandler}
    >
      {/*/  //? delete command button*/}
      {shouldRenderDeleteButton &&
        (<div className="absolute top-1 right-1">
          <div
            className="flex  rounded-full btn-sm btn btn-circle text-white bg-red-500"
            onClick={deleteItem}
          >
            <span className='text-lg pb-1.5'>
              x
            </span>
          </div>
        </div>)
      }
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
