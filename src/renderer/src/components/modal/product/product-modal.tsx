import ModalWrapper from "../shared/modal-wrapper";
import ProductModalBody from "./product-modal-body";

interface Props {
    title: string;
    modalIsOpened: boolean;
    modalHandler: () => void;
}

const ProductModal =
    ({ title, modalIsOpened, modalHandler }: Props) => {
        return (
            <ModalWrapper title={title} modalIsOpened={modalIsOpened} modalHandler={modalHandler}>
                <ProductModalBody />
            </ModalWrapper>
        )
    }

export default ProductModal