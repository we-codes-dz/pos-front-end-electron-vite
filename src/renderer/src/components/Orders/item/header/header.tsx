import OrderActionButtonSection from './order-action-button-section'
import OrderItemButtonSection from './order-item-button-section'

type TProps = {
  title: string
}
const OrderHeader = ({ title }: TProps) => {

  return (
    <div className="h-full flex flex-col gap-1 items-center justify-between px-5">
      <div className="font-bold text-xl">Current Order</div>
      <div className="flex flex-col justify-between gap-2 w-full">
        <label >{title}</label>
        <div className='space-y-3 '>
          <OrderActionButtonSection />
          <OrderItemButtonSection />
        </div>
      </div>
      {/* <NoteOrderModal handleAddNoteButton={(data) => handleAddNoteButton(data)} modalHandler={modalHandler} modalIsOpened={modalIsOpened} title='Add note' /> */}
    </div>
  )
}

export default OrderHeader
