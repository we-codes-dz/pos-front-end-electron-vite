import { useState } from "react";
import { TOrder } from "../../../../../data/tableCommandData";
import ProductInformation from "./product-information";
import Controller from "./controller/controller";
import Total from "./total";

type TProps = {
    item: TOrder;
}
const Item =
    ({ item }: TProps) => {
        const [quantity, setQuantity] = useState<number>(1);

        const addQuantity = () => {
            setQuantity(prev =>
                prev + 1
            );
        }
        const minusQuantity = () => {
            if (quantity > 1)
                setQuantity(prev =>
                    prev - 1
                );
        }
        return (
            <div className="flex flex-col  rounded-md relative border-2">
                {/*/  //? delete command button*/}
                <div className="absolute top-1 right-1">
                    <div className="flex justify-center items-center rounded-full p-2 h-4 w-4 text-white text-sm bg-red-500">x</div>
                </div>
                <ProductInformation item={item} />
                {/* //? total of the item **/}
                <div className="w-ful  flex justify-between pl-2 pb-2">
                    <Controller addQuantity={addQuantity} minusQuantity={minusQuantity} quantity={quantity} />
                    <Total price={item.price} quantity={quantity} />
                </div>
            </div>
        )
    }

export default Item