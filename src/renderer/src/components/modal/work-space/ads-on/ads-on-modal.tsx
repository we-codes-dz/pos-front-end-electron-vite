import { cn } from "@renderer/utils/helper";
import ConfirmationModalWrapper from "../../shared/confirmation-modal-wrapper";
import ModalBody from "./ads-on-modal-body";
import { useBoundStore } from "@renderer/stores/store";
import { FaTrashCan } from "react-icons/fa6";

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
        const { currentAddOns, clearSpecificProductSupplies, selectProductId } = useBoundStore(set => set)
        console.log('currentAddOns : ', currentAddOns)
        const clickHandler = () => {
            //clearAllSuppliesForProduct(selectProductId)
            clearSpecificProductSupplies(selectProductId)
        }
        return (
            <ConfirmationModalWrapper title={title} modalIsOpened={modalIsOpened} modalHandler={modalHandler} maxWidth="max-w-lg" className="relation" >
                <div
                    className={cn(
                        "absolute right-5 top-7 btn btn-square bg-red-100",
                        { "btn-disabled": currentAddOns?.length === 0 }
                    )}
                    onClick={() => clickHandler()}
                >
                    <FaTrashCan
                        className={cn(
                            "text-red-500"
                            ,
                            { "text-red-100": currentAddOns?.length === 0 }
                        )}
                        size={20}
                        strokeWidth={1.8}
                    />
                </div>
                <ModalBody modalHandler={modalHandler} confirmDeletingHandler={handleAddNoteButton} btnClassName="bg-info" />
            </ConfirmationModalWrapper>
        )
    }

export default AdsOnOrderModal