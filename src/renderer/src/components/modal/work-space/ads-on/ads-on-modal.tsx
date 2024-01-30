import { cn, getAddOnsFromCurrentOrders } from "@renderer/utils/helper";
import ConfirmationModalWrapper from "../../shared/confirmation-modal-wrapper";
import ModalBody from "./ads-on-modal-body";
import { useBoundStore } from "@renderer/stores/store";
import { FaTrashCan } from "react-icons/fa6";
import { shallow } from 'zustand/shallow'


type TInputs = {
    note: string;
}
interface Props {
    title: string;
    modalIsOpened: boolean;
    modalHandler: () => void;
    handleAddNoteButton: (data: TInputs) => void;
}

const AdsOnOrderModal =
    ({ title, modalIsOpened, modalHandler, handleAddNoteButton }: Props) => {
        // const { currentOrder, clearSpecificProductSupplies, selectProductId } =
        // useBoundStore((state) => state))
        //? add useShallow to  re-renders the component when either currentOrder or selectProductId or clearSpecificProductSupplies change
        const [
            currentOrder,
            selectProductId,
            clearSpecificProductSupplies
        ] =
            useBoundStore((state) => [
                state.currentOrder,
                state.selectProductId,
                state.clearSpecificProductSupplies,
            ], shallow)

        if (!currentOrder) return null

        const currentAddOns = getAddOnsFromCurrentOrders(currentOrder, selectProductId)

        const clickHandler = () => {
            //clearAllSuppliesForProduct(selectProductId)
            clearSpecificProductSupplies(selectProductId)
        }
        return (
            <ConfirmationModalWrapper title={title} modalIsOpened={modalIsOpened} modalHandler={modalHandler} maxWidth="max-w-lg" className="relative" >
                {currentAddOns && currentAddOns?.length > 0 && <button
                    className={cn(
                        "absolute right-5 top-7 btn btn-square bg-red-100",
                    )}
                    onClick={() => clickHandler()}
                >
                    <FaTrashCan
                        className={cn(
                            "text-red-500"
                        )}
                        size={20}
                        strokeWidth={1.8}
                    />
                </button>}
                <ModalBody modalHandler={modalHandler} confirmDeletingHandler={handleAddNoteButton} btnClassName="bg-info" />
            </ConfirmationModalWrapper>
        )
    }

export default AdsOnOrderModal