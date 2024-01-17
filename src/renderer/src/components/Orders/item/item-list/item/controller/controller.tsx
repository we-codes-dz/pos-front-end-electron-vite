interface Props {
    addQuantity: () => void;
    minusQuantity: () => void;
    quantity: number;
}
const Controller =
    ({ addQuantity, minusQuantity, quantity }: Props) => {

        return (
            <div className="w-3/5 flex  gap-2 items-center ">
                {quantity > 1 ?
                    <button className="px-3 py-1 rounded-md bg-gray-300 text-white font-bold" onClick={minusQuantity}>-</button>
                    : <button className="px-3 py-1 rounded-md bg-red-400 text-white font-bold">x</button>
                }
                <span className="font-semibold px-1 ">{quantity}</span>
                <button className="px-3 py-1 rounded-md bg-green-300 text-white font-bold" onClick={addQuantity}>+</button>
            </div>
        )
    }

export default Controller