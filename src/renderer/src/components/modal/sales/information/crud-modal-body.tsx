import { cn } from '@renderer/utils/helper'

interface Props {
    btnClassName?: string
    modalHandler: () => void
    data: any
}
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

const ModalBody = ({ modalHandler, btnClassName, data }: Props) => {
    return (
        <div className=" ">
            <div className="stat"></div>
            <div className="text-m pl-2 pb-3">
                <div className="text-m mb-1">Caissier: {data.server.fullName}</div>
                <div>Order n: {data.id}</div>
                {data.table ? (
                    <div className="text-sm text-right">
                        Table Number: {data.table.number}, Floor: {data.table.floor}
                    </div>
                ) : (
                    <div className="text-sm text-right">This order was delivered.</div>
                )}
            </div>
            <div className="flex text-sm pt-1 px-1">
                <span className="w-2/6">Name</span>
                <span className="w-2/6 text-right">Price</span>
                <span className="w-2/6 text-right">Quantity</span>
            </div>
            <div className="border-solid border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1">
                {data.items.map((item: any) => (
                    <div className="flex justify-between text-sm" key={item.id}>
                        <span className="w-2/6 truncate">{item.product.name}</span>
                        <span className="w-2/6 text-right">{item.price}</span>
                        <span className="w-2/6 text-right">{item.quantity}</span>{' '}
                    </div>
                ))}
            </div>
            <div className="text-right">
                <div>Date: {formatDate(data.createdAt)}</div>
                <div className="font-bold text-sm">TOTAL: {data.total}DZD</div>
            </div>
            <div className="modal-action">
                <button
                    className={cn('text-accent btn bg-neutral border-none hover:text-white', btnClassName)}
                    onClick={modalHandler}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default ModalBody
