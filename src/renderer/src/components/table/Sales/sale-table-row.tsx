import { formatDateOnly } from "@renderer/utils/helper";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Td, Tr } from "../common";

type TProps = {
    sale: any;
    handleInfoButtonClick: () => void;
}

const SaleTableRow =
    ({ sale, handleInfoButtonClick }: TProps) => {
        return (
            <Tr className="intro-x">
                <Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="font-medium whitespace-nowrap">
                        {sale.table?.number}
                    </span>
                </Td>
                <Td className="first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="font-medium whitespace-nowrap">
                        {sale.total}
                    </span>
                </Td>
                <Td className="first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="font-medium whitespace-nowrap">
                        {/* {new Date(sale.createdAt).toISOString().split('T')[0]} */}
                        {formatDateOnly(sale.createdAt)}
                    </span>
                </Td>

                <Td
                    className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
                >
                    <div className="flex items-center justify-between ">
                        <div className="flex gap-1 items-center text-info">
                            <IoMdInformationCircleOutline onClick={handleInfoButtonClick} size={30} strokeWidth={1.8} />
                            Voir
                        </div>
                    </div>
                </Td>
            </Tr>
        )
    }

export default SaleTableRow