interface Props {
    addQuantity: () => void;
    minusQuantity: () => void;
    quantity: number;
}
const Controller =
    ({ addQuantity, minusQuantity, quantity }: Props) => {
        const addClickHandler = (e: any) => {
            e.stopPropagation()
            addQuantity()
        }

        const subClickHandler = (e: any) => {
            e.stopPropagation()
            minusQuantity()
        }
        return (
            <div className="w-3/5 flex  gap-2 items-center " onClick={(e: any) => e.stopPropagation()}>
                {quantity > 1 ?
                    <button className="px-3 py-1 rounded-md bg-gray-300 text-white font-bold" onClick={subClickHandler}>-</button>
                    : <button className="px-3 py-1 rounded-md bg-red-400 text-white font-bold">x</button>
                }
                <span className="font-semibold px-1 ">{quantity}</span>
                <button className="px-3 py-1 rounded-md bg-green-300 text-white font-bold" onClick={addClickHandler}>+</button>
            </div>
        )
    }

export default Controller