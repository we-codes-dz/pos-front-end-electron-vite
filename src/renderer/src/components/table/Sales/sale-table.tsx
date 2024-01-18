import SaleInformationModal from "@renderer/components/modal/sales/inforrmation/crud-modal";
import { TProduct } from "@renderer/types/type-schema";
import { cn, formatDateOnly } from "@renderer/utils/helper";
import { useEffect, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Table, Tbody, Td, Th, Thead, Tr } from "../common";
import Header from "../common/header";
import { Pagination } from '../common/pagination/pagination';

//TODO: add pagination logic

export interface ColumnHeaderInt {
    key: string;
    label: string;
}

interface Props {
    headers: ColumnHeaderInt[];
    sales: TProduct[];
}
const SalesTable =
    ({ headers, sales }: Props) => {

        const [salesData, setSalesData] = useState<any[]>(sales);
        const [SelectedSale, setSelectedSale] = useState();
        const [isDeleteModalOpen, setOpenedDeleteModal] = useState<boolean>(false);

        const [currentPage, setCurrentPage] = useState(1);
        // Show 8 sales per page  
        const itemsPerPage = 7;
        // Logic to slice array for current page
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = salesData.slice(indexOfFirstItem, indexOfLastItem);
        // Total pages 
        const totalPages = Math.ceil(salesData.length / itemsPerPage);


        useEffect(() => {
            setSalesData(sales);
        }, [salesData])


        //? modal logic
        const modalHandler = () => {
            setOpenedDeleteModal(!isDeleteModalOpen);
        }



        const handleInfoButtonClick =
            (element: any) => {
                setSelectedSale(element);
                setOpenedDeleteModal(!isDeleteModalOpen);
            }

        return (
            <div className="mt-4 pb-2">
                <div className="flex justify-between items-center w-full ">
                    <Header title={"Sales"} />
                </div>
                {//? ************Table
                }
                total pages : {totalPages}
                <div className=" overflow-auto intro-y lg:overflow-visible ">
                    <Table className="border-spacing-y-[10px] border-separate ">
                        <Thead>
                            <Tr>
                                {headers.map((item) => (
                                    <Th key={item.key} className={cn(
                                        { "text-center": item.label === 'actions' },
                                        "border-b-0 whitespace-nowrap"
                                    )}>
                                        {item.label}
                                    </Th>
                                ))
                                }
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentItems?.map((item, fakerKey) => (
                                <Tr key={fakerKey} className="intro-x">
                                    <Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <span className="font-medium whitespace-nowrap">
                                            {item.table?.number}
                                        </span>
                                    </Td>
                                    <Td className="first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <span className="font-medium whitespace-nowrap">
                                            {item.total}
                                        </span>
                                    </Td>
                                    <Td className="first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <span className="font-medium whitespace-nowrap">
                                            {/* {new Date(item.createdAt).toISOString().split('T')[0]} */}
                                            {formatDateOnly(item.createdAt)}
                                        </span>
                                    </Td>

                                    <Td
                                        className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
                                    >
                                        <div className="flex items-center justify-between ">
                                            <div className="flex gap-1 items-center text-info">
                                                <IoMdInformationCircleOutline onClick={() => handleInfoButtonClick(item)} size={30} strokeWidth={1.8} />
                                                Voir
                                            </div>
                                        </div>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    <div className='flex justify-center mt-3'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                </div>
                <SaleInformationModal title={"Information"} modalHandler={modalHandler} modalIsOpened={isDeleteModalOpen} data={SelectedSale} />
            </div>
        )
    }

export default SalesTable

