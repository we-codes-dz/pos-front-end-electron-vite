import { TOrderList } from '../../../data/tableCommandData';
import OrderHeader from './header';
import ItemList from './item-list';
import TotalOrder from './total';
import PayButton from './button/PayButton';
type TProps = {
    order: TOrderList;
}
const OrderItem =
    ({ order }: TProps) => {
        return (
            <div className='justify-between h-full'>
                <div className="h-1/6">
                    <OrderHeader title={`Table ${order.tableNumber}`} />
                </div>
                <div className="h-3/6 px-5">
                    <ItemList itemList={order.orders} />
                </div>
                <div className="h-3/6">
                    <TotalOrder />
                    <PayButton />
                </div>
            </div>
        )
    }

export default OrderItem