import ConfirmationModalWrapper from "../../shared/confirmation-modal-wrapper";
import ModalBody from "./note-modal-body";

type TInputs = {
    note: string;
}
interface Props {
    title: string;
    modalIsOpened: boolean;
    modalHandler: () => void;
    handleAddNoteButton: (data: TInputs) => void;
}

const NoteOrderModal =
    ({ title, modalIsOpened, modalHandler, handleAddNoteButton }: Props) => {
        return (
            //TODO: add cancel and remove customized button to delete modal
            <ConfirmationModalWrapper title={title} modalIsOpened={modalIsOpened} modalHandler={modalHandler} >
                <ModalBody modalHandler={modalHandler} confirmDeletingHandler={handleAddNoteButton} btnClassName="bg-info" />
            </ConfirmationModalWrapper>
        )
    }

export default NoteOrderModal