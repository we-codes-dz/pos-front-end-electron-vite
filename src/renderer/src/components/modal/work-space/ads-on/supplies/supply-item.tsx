import { useBoundStore } from "@renderer/stores/store";
import { cn, supplyExistInOrder } from "@renderer/utils/helper";
import { TSuppliesData } from "./data";
import { shallow } from 'zustand/shallow'
type TProps = {
    item: TSuppliesData
}

const SupplyItem =
    ({ item }: TProps) => {
        const [
            selectProductId,
            currentOrder,
            clearSpecificAddon,
            addAddOns,
        ] = useBoundStore((state) => [
            state.selectProductId,
            state.currentOrder,
            state.clearSpecificAddon,
            state.addAddOns
        ], shallow)


        //console.log('currentOrder :', currentOrder)
        const supply = { name: item.name, productId: selectProductId }
        if (!currentOrder) return null
        const isSupplyExists = supplyExistInOrder(selectProductId, supply.name, currentOrder)

        const onClickHandler = () => {
            //? check if supply already exist
            if (currentOrder)
                if (isSupplyExists) {
                    //? if yes ,remove it
                    clearSpecificAddon(selectProductId, supply.name)
                }
                else {
                    //? if no ,add it
                    // setSupplySelected(supply);
                    addAddOns(selectProductId, supply.name)
                    //? add the new item to the supplies of the product selected
                    // setSuppliesOfSpecificProduct(selectProductId)
                }
            return
        }
        return (
            <div
                className={cn(
                    "flex justify-center shadow-md w-fit p-2 rounded",
                    { "bg-slate-400": isSupplyExists }
                )
                }
                onClick={onClickHandler}
            >
                <img src={item.path} className="h-10" alt="d" />
                <div className="label !text-2xl uppercase "> {item.name}</div>
            </div>
        )
    }

export default SupplyItem