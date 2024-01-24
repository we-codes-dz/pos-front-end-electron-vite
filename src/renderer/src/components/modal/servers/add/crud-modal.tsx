import CreateModalWrapper from "../../shared/create-modal-wrapper";
import ModalBody from "./add-modal-body";


interface Props {
    title: string
    modalIsOpened: boolean
    modalHandler: () => void
    setDataInputs: (data: any) => void
    handleAddButtonSubmit: () => void
}

const CRUDAddServerModal =
    ({
        title,
        modalIsOpened,
        modalHandler,
        setDataInputs,
        handleAddButtonSubmit
    }: Props) => {
        return (
            //TODO: add cancel and remove customized button to delete modal
            <CreateModalWrapper title={title} modalIsOpened={modalIsOpened} btnClassName="btn-second">
                <ModalBody
                    setDataInputs={setDataInputs}
                    modalHandler={modalHandler}
                    handleAddButtonSubmit={handleAddButtonSubmit}
                />
            </CreateModalWrapper>
        )
    }

export default CRUDAddServerModal