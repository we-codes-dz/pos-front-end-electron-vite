interface Props {
  totalPrice: number
}

const TotalOrder = ({ totalPrice }: Props) => {
  return (
    <div className="px-2 h-1/4 ">
      <div className="py-1 rounded-md shadow-lg">
        <div className="border-t-2 mt-3 py-2 px-4 flex items-center justify-between">
          <span className="font-semibold text-2xl">Total</span>
          <span className="font-bold text-2xl">{totalPrice}DZD</span>
        </div>
      </div>
    </div>
  )
}

export default TotalOrder
