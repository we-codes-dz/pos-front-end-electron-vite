import { TOrder } from "../../../../data/tableCommandData";
import Item from "./item/item"
type TProps = {
    itemList: TOrder[];
}
const ItemList =
    ({ itemList }: TProps) => {
        return (
            <div className="px-1.5 py-4 mt-5 overflow-y-scroll h-full w-full space-y-2">
                {itemList.map((item) => (
                    <Item key={item.name} item={item} />
                ))
                }
            </div>
        )
    }

export default ItemList