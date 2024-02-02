import { useBoundStore } from '@renderer/stores/store';
import { TItem, TOrder } from '@renderer/types/type-schema';
import PayPendingButton from './button/pending-button';



const mapItems =
    (items: TItem[]) => {
        return items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            addOns: item.addOns?.join(', ').trim(),
            note: item.note,
            product: item.product,
        }));
    };

const constructOrderData =
    (currentOrder: TOrder) => {
        const data: any = {
            server: { id: 1 },
            table: { id: null },
            items: mapItems(currentOrder.items),
            total: currentOrder.total,
        };

        if (currentOrder.table !== null) {
            const dataTableId: number | undefined = currentOrder.table?.id;

            if (dataTableId !== 0 && dataTableId !== null) {
                data.table = { id: dataTableId };
            } else {
                delete data.table;
            }
        }

        return data;

    };


const ItemListFooter = () => {
    const processToPaymentModalHandler = useBoundStore((state) => state.processToPaymentModalHandler)
    const addProductToPendingOrders = useBoundStore((state) => state.addProductToPendingOrders)
    const { currentOrder, clearCurrentOrder } = useBoundStore((state) => state)


    const submitOrder = () => {
        if (currentOrder) {
            //const data = constructOrderData(currentOrder);
            //? add it to state

            // addOrder.mutate(data)
        }
    }
    //? add it to state


    const submitPendingOrder = () => {
        if (currentOrder) {
            const data = constructOrderData(currentOrder);
            //TODO Add object to pending array cache
            //? add it to state
            data.status = 'PENDING'
            console.log('pending order data : ', data)

            //addOrder.mutate(data)

            //TODO Add object to pending array cache
            //? add it to state
            data.status = 'PENDING'
            addProductToPendingOrders(data)
            clearCurrentOrder()
            // addOrder.mutate(data)
        }
    }
    return (
        <div className="flex justify-between h-2/3 px-2 mt-2 gap-2">
            <PayPendingButton
                title="Pay"
                className="btn-secondary"
                onClick={processToPaymentModalHandler}
            />
            <PayPendingButton title="To Kitchen" className="btn-info" onClick={submitOrder} />
            <PayPendingButton title="pending" className="btn-warning" onClick={submitPendingOrder} />
        </div>
    )
}

export default ItemListFooter
