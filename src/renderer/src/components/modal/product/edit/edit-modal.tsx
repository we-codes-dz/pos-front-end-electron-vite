import { TProduct } from "@renderer/types/type-schema";
import CreateModalWrapper from "../../shared/create-modal-wrapper";
import ModalBody from "./edit-modal-body";


interface Props {
    title: string;
    modalIsOpened: boolean;
    modalHandler: () => void;
    handleDeleteButtonClick: () => void;
    data?: TProduct;
}

const CRUDEditProductModal =
    ({ title, modalIsOpened, modalHandler, handleDeleteButtonClick, data }: Props) => {
        return (
            //TODO: add cancel and remove customized button to delete modal
            <CreateModalWrapper title={title} modalIsOpened={modalIsOpened} modalHandler={modalHandler} onClickHandler={handleDeleteButtonClick} btnClassName="btn-second">
                <ModalBody modalHandler={modalHandler} data={data} />
            </CreateModalWrapper>
        )
    }

export default CRUDEditProductModal