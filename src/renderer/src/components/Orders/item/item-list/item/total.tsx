
interface Props {
    price: number;
    quantity: number;
}
const Total =
    ({ price, quantity }: Props) => {
        return (
            <div className="font-semibold text-md self-end text-center text-green-700 pr-2">
                {(quantity * parseFloat(price.toFixed(2))).toFixed(2)}DA
            </div>
        )
    }

export default Total