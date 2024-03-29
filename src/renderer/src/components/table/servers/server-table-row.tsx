import { TProduct, TServer } from '@renderer/types/type-schema'
import { Td, Tr } from '../common'
import { FaEdit } from 'react-icons/fa'
import { FaTrashCan } from 'react-icons/fa6'
import { formatDateOnly } from '@renderer/utils/helper'

type TProps = {
  server: TServer
  handleEditButtonClick: () => void
  modalDeleteHandler: () => void
  catchingId: (data: any) => void
}
const ServerTableRow = ({
  server,
  handleEditButtonClick,
  modalDeleteHandler,
  catchingId
}: TProps) => {
  const clickHandler = () => {
    catchingId(server.id)
    modalDeleteHandler()
  }

  // Now you can perform the necessary operations on the 'price' variable
  return (
    <Tr className="intro-x">
      <Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
        <span className="font-medium whitespace-nowrap">{server.fullName}</span>
      </Td>
      <Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
        <span className="font-medium whitespace-nowrap">{formatDateOnly(server.createdAt)}</span>
      </Td>

      <Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
        <div className="flex items-center justify-between ">
          <div
            className="flex gap-1 items-end text-neutral-900 hover:cursor-pointer"
            onClick={handleEditButtonClick}
          >
            <FaEdit className="text-neutral-900" size={30} strokeWidth={1.8} />
            Edit
          </div>
          <div
            className="flex gap-1 items-end text-error hover:cursor-pointer"
            onClick={clickHandler}
          >
            <FaTrashCan className="text-error" size={30} strokeWidth={1.8} />
            Delete
          </div>
        </div>
      </Td>
    </Tr>
  )
}

export default ServerTableRow
