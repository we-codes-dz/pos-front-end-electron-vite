import React from 'react'
import { TOrder } from '../../../../../data/tableCommandData';
interface Props {
    item: TOrder;
}
const ProductInformation =
    ({ item }: Props) => {
        return (
            <div className="flex flex-row justify-between items-center mb-4 w-full rounded-md ">
                <img src={`${item.img}`} className="w-12 h-12 object-cover rounded-tl-md" alt={`${item.img}`} />
                <div className="flex flex-col w-full">
                    <span className="ml-1 font-medium text-sm">{item.name}</span>
                    <span className="ml-1 font-medium text-xs text-green-700">{item.price}DA</span>
                </div>
            </div>
        )
    }

export default ProductInformation