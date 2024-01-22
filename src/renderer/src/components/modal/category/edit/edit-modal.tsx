import { TCategory } from "@renderer/types/type-schema";
import CreateModalWrapper from "../../shared/create-modal-wrapper";
import ModalBody from "./edit-modal-body";


interface Props {
    title: string;
    modalIsOpened: boolean;
    modalHandler: () => void;
    handleEditButtonClick: (data: any) => void;
    data?: TCategory;
}

const CRUDEditCategoryModal =
    ({ title, modalIsOpened, modalHandler, handleEditButtonClick, data }: Props) => {
        return (
            //TODO: add cancel and remove customized button to delete modal
            <CreateModalWrapper title={title} modalIsOpened={modalIsOpened} btnClassName="btn-second">
                <ModalBody modalHandler={modalHandler} data={data} onClickHandler={handleEditButtonClick} />
            </CreateModalWrapper>
        )
    }

export default CRUDEditCategoryModal