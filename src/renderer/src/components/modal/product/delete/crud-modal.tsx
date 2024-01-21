import ConfirmationModalWrapper from "../../shared/confirmation-modal-wrapper";
import ModalBody from "./crud-modal-body";


interface Props {
    title: string;
    modalIsOpened: boolean;
    modalHandler: () => void;
}

const CRUDDeleteProductModal =
    ({ title, modalIsOpened, modalHandler }: Props) => {
        return (
            //TODO: add cancel and remove customized button to delete modal
            <ConfirmationModalWrapper title={title} modalIsOpened={modalIsOpened} modalHandler={modalHandler} >
                <ModalBody modalHandler={modalHandler} btnClassName="btn-error" />
            </ConfirmationModalWrapper>
        )
    }

export default CRUDDeleteProductModal