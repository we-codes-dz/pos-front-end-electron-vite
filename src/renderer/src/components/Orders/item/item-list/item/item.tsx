import { useBoundStore } from '@renderer/stores/store'
import { cn, getAddOnsFromCurrentOrders } from '@renderer/utils/helper'
import { useCallback, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { TOrderItem } from '../../../../../data/tableCommandData'
import AddOns from './add-ons'
import Controller from './controller/controller'
import DeleteItemButton from './delete-item-button'
import ProductInformation from './product-information'
import Total from './total'

type TProps = {
  item: TOrderItem
}
const Item = ({ item }: TProps) => {
  const [quantity, setQuantity] = useState<number>(item.quantity)
  const [isShowed, setShow] = useState<boolean>(false);

  const [
    currentOrder,
    selectProductId,
    isItemChosen,
    deleteItemFromCurrentOrder,
    updateItemQuantity,
    setSelectProductId,
    setIsItemChosen
  ] =
    useBoundStore((state) => [
      state.currentOrder,
      state.selectProductId,
      state.isItemChosen,
      state.deleteItemFromCurrentOrder,
      state.updateItemQuantity,
      state.setSelectProductId,
      state.setIsItemChosen,
    ], shallow)

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

  const itemClickHandler = useCallback(() => {
    setSelectProductId(item.product.id);
    setIsItemChosen(item.product.id !== selectProductId || !isItemChosen);
  }, [item.product.id, selectProductId, isItemChosen]);

  const isSelectedAndChosen = item.product.id === selectProductId && isItemChosen;
  const shouldRenderDeleteButton = isItemChosen && item.product.id === selectProductId

  //add ons logic
  const addOns = currentOrder ? getAddOnsFromCurrentOrders(currentOrder, item.product.id) : []
  return (
    <div
      className={cn('flex flex-col rounded-md relative border-2', {
        'bg-slate-300 scale-105': isSelectedAndChosen,
      })}
      onClick={itemClickHandler}
    >
      {shouldRenderDeleteButton && <DeleteItemButton onClick={deleteItem} />}
      <ProductInformation item={item} />
      <AddOns addOns={addOns} clickHandler={() => setShow(!isShowed)} display={isShowed} />
      {/* //? total of the item **/}
      <div className="w-ful  flex justify-between pl-2 pb-2" onClick={(e: any) => e.stopPropagation()}>
        <Controller addQuantity={addQuantity} minusQuantity={minusQuantity} quantity={quantity} />
        <Total price={item.price} quantity={quantity} />
      </div>
    </div>
  )
}

export default Item
