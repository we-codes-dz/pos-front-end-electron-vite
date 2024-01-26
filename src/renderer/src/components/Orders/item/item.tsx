import { TItem } from '@renderer/types/type-schema'
import { useEffect, useState } from 'react'
import { TOrderList } from '../../../data/tableCommandData'
import PayButton from './button/PayButton'
import OrderHeader from './header'
import ItemList from './item-list'
import TotalOrder from './total'
type TProps = {
  order: TOrderList
}
const OrderItem = ({ order }: TProps) => {
  console.log('THE ORDER', order)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  // Function to calculate the total price
  const calculateTotalPrice = (items: TItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Update total price when items change
  useEffect(() => {
    setTotalPrice(calculateTotalPrice(order.items))
  }, [order.items])
  return (
    <div className="justify-between h-full">
      <div className="h-1/6">
        <OrderHeader title={`Table ${order.tableNumber}`} />
      </div>
      <div className="h-3/6 px-5">
        <ItemList itemList={order.items} />
      </div>
      <div className="h-3/6">
        <TotalOrder totalPrice={totalPrice} />
        <PayButton />
      </div>
    </div>
  )
}

export default OrderItem
