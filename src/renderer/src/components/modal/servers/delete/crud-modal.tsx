import ConfirmationModalWrapper from "../../shared/confirmation-modal-wrapper";
import ModalBody from "./crud-modal-body";


interface Props {
    title: string;
    modalIsOpened: boolean;
    modalHandler: () => void;
    handleDeleteButtonClick: () => void;

}

const CRUDDeleteServerModal =
    ({ title, modalIsOpened, modalHandler, handleDeleteButtonClick }: Props) => {
        return (
            //TODO: add cancel and remove customized button to delete modal
            <ConfirmationModalWrapper title={title} modalIsOpened={modalIsOpened} modalHandler={modalHandler} >
                <ModalBody modalHandler={modalHandler} confirmDeletingHandler={handleDeleteButtonClick} btnClassName="btn-error" />
            </ConfirmationModalWrapper>
        )
    }

export default CRUDDeleteServerModal