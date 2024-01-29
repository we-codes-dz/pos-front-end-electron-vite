import ConfirmationModalWrapper from '../../shared/confirmation-modal-wrapper'
import ModalBody from './crud-modal-body'

interface Props {
  title: string
  modalIsOpened: boolean
  modalHandler: () => void
  data: any
}

const OrderInformationModal = ({ title, modalIsOpened, modalHandler, data }: Props) => {
  return (
    //TODO: add cancel and remove customized button to delete modal
    <ConfirmationModalWrapper
      title={title}
      modalIsOpened={modalIsOpened}
      modalHandler={modalHandler}
    >
      <ModalBody modalHandler={modalHandler} btnClassName="btn-error" data={data} />
    </ConfirmationModalWrapper>
  )
}

export default OrderInformationModal
