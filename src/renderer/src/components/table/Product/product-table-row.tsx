import { TProduct } from "@renderer/types/type-schema"
import { Td, Tr } from "../common"
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

type TProps = {
    product: TProduct;
    handleEditButtonClick: () => void;
    modalDeleteHandler: () => void;
}
const ProductTableRow =
    ({ product, handleEditButtonClick, modalDeleteHandler }: TProps) => {
        return (
            <Tr className="intro-x">
                <Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="font-medium whitespace-nowrap">
                        {product.name}
                    </span>
                </Td>
                <Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="font-medium whitespace-nowrap">
                        {product.description}
                    </span>
                </Td>
                <Td className="first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="font-medium whitespace-nowrap">
                        {parseFloat(product.price.toFixed(2)).toFixed(2)}DA
                    </span>
                </Td>
                <Td className="first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="font-medium whitespace-nowrap">
                        {//TODO: adding category display
                        }
                        {"product.category"}
                    </span>
                </Td>

                <Td
                    className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
                >
                    <div className="flex items-center justify-between ">
                        <div className="flex gap-1 items-end text-neutral-900">
                            <FaEdit onClick={handleEditButtonClick} className="text-neutral-900" size={30} strokeWidth={1.8} />
                            Edit
                        </div>
                        <div className="flex gap-1 items-end text-error">
                            <FaTrashCan onClick={modalDeleteHandler} className="text-error" size={30} strokeWidth={1.8} />
                            Delete
                        </div>
                    </div>
                </Td>
            </Tr>
        )
    }

export default ProductTableRow