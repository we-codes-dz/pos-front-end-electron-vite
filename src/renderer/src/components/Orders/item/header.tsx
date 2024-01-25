import { useBoundStore } from '@renderer/stores/store'

type TProps = {
  title: string
}
const OrderHeader = ({ title }: TProps) => {
  const { clearCurrentOrder } = useBoundStore((state) => state)
  const removeItems = () => {
    clearCurrentOrder()
  }

  return (
    <div className="h-full flex flex-col gap-4 items-center justify-between px-5 mt-5">
      <div className="font-bold text-xl">Current Order</div>
      <div className="flex flex-col justify-between gap-3 w-full">
        <span>{title}</span>
        <div className="space-x-2 font-semibold self-end ">
          <span className="px-4 py-2 rounded-md bg-red-100 text-red-500" onClick={removeItems}>
            Clear All
          </span>
          <span className="px-4 py-2 rounded-md bg-gray-100 text-gray-800">Setting</span>
        </div>
      </div>
    </div>
  )
}

export default OrderHeader
