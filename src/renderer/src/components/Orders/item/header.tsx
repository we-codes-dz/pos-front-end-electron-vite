import { useBoundStore } from '@renderer/stores/store'
import { cn } from '@renderer/utils/helper'

type TProps = {
  title: string
}
const OrderHeader = ({ title }: TProps) => {

  const { clearCurrentOrder, selectProductId, isItemChosen, modalHandler } = useBoundStore((state) => state)
  const removeItems = () => {
    clearCurrentOrder()
  }


  // const handleAddNoteButton = (data: { note: string }) => {
  //   addNoteToProduct(3, data.note)
  //   console.log('note :', data, 'product Selected : ', selectProductId)
  // }
  return (
    <div className="h-full flex flex-col gap-4 items-center justify-between px-5 mt-5">
      <div className="font-bold text-xl">Current Order</div>
      <div className="flex flex-col justify-between gap-3 w-full">
        <span>{title}</span>
        <div className="space-x-2 font-semibold self-end ">
          <button className="px-2 py-2 btn btn-error rounded-md bg-red-100 text-red-500" onClick={removeItems}>
            Clear All
          </button>
          <button
            className={cn(
              "px-2 py-2 rounded-md bg-gray-100 text-gray-800",
              "btn",
              { "btn-disabled": true }
            )
            }
          >
            Adds On
          </button>
          <button
            className={cn(
              "px-2 py-2 rounded-md bg-gray-100 text-gray-800",
              "btn",
              { "btn-disabled": !isItemChosen || selectProductId === 0 }
            )
            }
            onClick={modalHandler}
          >
            Note
          </button>
        </div>
      </div>
      {/* <NoteOrderModal handleAddNoteButton={(data) => handleAddNoteButton(data)} modalHandler={modalHandler} modalIsOpened={modalIsOpened} title='Add note' /> */}
    </div>
  )
}

export default OrderHeader
