import NoteOrderModal from '@renderer/components/modal/work-space/note/note-modal'
import { useBoundStore } from '@renderer/stores/store'
import { cn } from '@renderer/utils/helper'
import { useState } from 'react'

type TProps = {
  title: string
  selectProductId: number
}
const OrderHeader = ({ title, selectProductId }: TProps) => {
  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);
  const { clearCurrentOrder, addNoteToProduct } = useBoundStore((state) => state)
  const removeItems = () => {
    clearCurrentOrder()
  }


  const modalHandler = () => {
    setModalIsOpened(!modalIsOpened)
  }

  const handleAddNoteButton = (data: { note: string }) => {
    addNoteToProduct(3, data.note)
    console.log('note :', data, 'product Selected : ', selectProductId)
  }
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
              { "btn-disabled": false }
            )
            }
          >
            Adds On
          </button>
          <button
            className={cn(
              "px-2 py-2 rounded-md bg-gray-100 text-gray-800",
              "btn",
              { "btn-disabled": selectProductId === 0 }
            )
            }
            onClick={modalHandler}
          >
            Note
          </button>
        </div>
      </div>
      <NoteOrderModal handleAddNoteButton={(data) => handleAddNoteButton(data)} modalHandler={modalHandler} modalIsOpened={modalIsOpened} title='Add note' />
    </div>
  )
}

export default OrderHeader
