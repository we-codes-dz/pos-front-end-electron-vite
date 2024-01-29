import { calculateTotalPrice } from '@renderer/utils/helper'
import { useEffect, useState } from 'react'
import { TOrderList } from '../../../data/tableCommandData'
import ItemListFooter from './footer/footer'
import OrderHeader from './header/header'
import ItemList from './item-list'
import TotalOrder from './total'
type TProps = {
  order: TOrderList
}
const OrderItem = ({ order }: TProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0)



  // Update total price when items change
  useEffect(() => {
    setTotalPrice(calculateTotalPrice(order.items))
  }, [order.items])

  return (
    <div className="h-full">
      <div className="">
        <OrderHeader title={`Table ${order.tableNumber}`} />
      </div>
      <div className="px-5 h-[290px]">
        <ItemList itemList={order.items} />
      </div>
      <div className="[200px]">
        <TotalOrder totalPrice={totalPrice} />
        <ItemListFooter />
      </div>
    </div>
  )
}

export default OrderItem
