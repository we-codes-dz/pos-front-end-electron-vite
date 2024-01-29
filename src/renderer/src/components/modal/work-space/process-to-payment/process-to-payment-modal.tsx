import ConfirmationModalWrapper from "../../shared/confirmation-modal-wrapper";
import ModalBody from "./process-to-payment-modal-body";

type TInputs = {
    note: string;
}
interface Props {
    title: string;
    modalIsOpened: boolean;
    modalHandler: () => void;
    handleAddNoteButton: (data: TInputs) => void;
}

const ProcessToPaymentOrderModal =
    ({ title, modalIsOpened, modalHandler, handleAddNoteButton }: Props) => {
        return (
            <ConfirmationModalWrapper title={title} modalIsOpened={modalIsOpened} modalHandler={modalHandler} >
                <ModalBody modalHandler={modalHandler} confirmDeletingHandler={handleAddNoteButton} btnClassName="bg-info" />
            </ConfirmationModalWrapper>
        )
    }

export default ProcessToPaymentOrderModal