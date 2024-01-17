import CreateModalWrapper from "../../shared/create-modal-wrapper";
import ModalBody from "./add-modal-body";


interface Props {
    title: string;
    modalIsOpened: boolean;
    modalHandler: () => void;
    handleCreateButtonClick: () => void;
    action: "create" | "edit"
}

const CRUDAddProductModal =
    ({ title, modalIsOpened, modalHandler, handleCreateButtonClick, action }: Props) => {
        return (
            //TODO: add cancel and remove customized button to delete modal
            <CreateModalWrapper title={title} modalIsOpened={modalIsOpened} modalHandler={modalHandler} onClickHandler={handleCreateButtonClick} btnClassName="btn-second">
                <ModalBody modalHandler={modalHandler} action={action} />
            </CreateModalWrapper>
        )
    }

export default CRUDAddProductModal