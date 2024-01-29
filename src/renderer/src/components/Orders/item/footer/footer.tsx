import { useBoundStore } from '@renderer/stores/store'
import PayPendingButton from './button/pending-button'
import { useAddOrder } from '@renderer/api/hooks/useOrders'
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate'

const ItemListFooter = () => {
  const { processToPaymentModalHandler } = useBoundStore((state) => state)
  const axiosInstance = useAxiosPrivate()
  const { currentOrder, clearCurrentOrder } = useBoundStore((state) => state)
  const addOrder = useAddOrder(axiosInstance, clearCurrentOrder)

  const submitOrder = () => {
    console.log('in submit', currentOrder)
    if (currentOrder) {
      let data: any = {
        server: {
          id: 1
        },
        table: {
          id: null
        },
        items: currentOrder?.items.map((item) => {
          return {
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            addOns: item.addOns?.join(', ').trim(),
            note: item.note,
            product: item.product
          }
        }),
        total: currentOrder?.total
      }

      if (currentOrder.table !== null) {
        const dataTableId: number | undefined = currentOrder.table?.id

        if (dataTableId !== 0 && dataTableId !== null) {
          data.table = {
            id: dataTableId
          }
        } else {
          delete data.table
        }
      }
      console.log('data before inserting into database', data)
      addOrder.mutate(data)
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
      <PayPendingButton title="pending" className="btn-warning" />
    </div>
  )
}

export default ItemListFooter
