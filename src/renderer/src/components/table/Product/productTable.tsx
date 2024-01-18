import { FaEdit } from "react-icons/fa";;
import { FaTrashCan } from "react-icons/fa6";
import { ChangeEvent, useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "../common";
import HeaderSection from "../common/header-section";
import CRUDDeleteProductModal from '../../modal/product/delete/crud-modal';
import CRUDAddProductModal from '../../modal/product/add/crud-modal';
import CRUDEditProductModal from '../../modal/product/edit/edit-modal';
import { Pagination } from '../common/pagination/pagination';
import { TProduct } from "@renderer/types/type-schema";
import { ProductOrderBy, orderProducts } from "@renderer/utils/filter";
import { cn } from "@renderer/utils/helper";



//TODO: add pagination logic

export interface ColumnHeaderInt {
    key: string;
    label: string;
}

interface Props {
    headers: ColumnHeaderInt[];
    products: TProduct[];
}
const FilterParameter = ProductOrderBy;
const ProductTable =
    ({ headers, products }: Props) => {

        const filterOptions = [
            { label: "Date", value: "Date" },
            { label: "Name", value: "Name" },
        ]
        const [selectedFilterParam, setSelectedFilterParam] = useState<ProductOrderBy>(FilterParameter.Empty);
        const [productData, setProductData] = useState<TProduct[]>(products);
        const [isDeleteModalOpen, setOpenedDeleteModal] = useState<boolean>(false);
        const [isCreateModalOpen, setOpenedCreateModal] = useState<boolean>(false);
        const [isEditModalOpen, setOpenedEditModal] = useState<boolean>(false);

        const [currentPage, setCurrentPage] = useState(1);
        // Show 8 products per page  
        const itemsPerPage = 7;
        // Logic to slice array for current page
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);
        // Total pages 
        const totalPages = Math.ceil(productData.length / itemsPerPage);


        //? selectedProductForEdit is variable used to display data in edit product modal
        const [selectedProductForEdit, setSelectedCategory] = useState<TProduct>();

        /* /**
         * Updates the filter parameter based on the selected value.
         * @param e - The change event from the select element.
         */
        const handleFilterParamChange =
            (e: ChangeEvent<HTMLSelectElement>) => {
                // Extract the selected value from the event
                const selectedValue = e.target.value;
                // Map the selected value to the corresponding FilterParameter enum
                const newFilterParam =
                    selectedValue === 'Name' ? FilterParameter.Name : FilterParameter.Empty;
                // Set the new filter parameter
                setSelectedFilterParam(newFilterParam);
            }

        useEffect(() => {
            const updatedData = orderProducts(products, selectedFilterParam) as TProduct[];
            setProductData(updatedData);
        }, [selectedFilterParam])


        //? modal logic
        //** delete modal
        const modalDeleteHandler = () => {
            setOpenedDeleteModal(!isDeleteModalOpen);
        }
        const handleDeleteButtonClick = () => {
            modalDeleteHandler();
            //TODO: adding delete via api and in global state
        }


        //** create modal
        const toggleCreateModal = () => {
            setOpenedCreateModal(!isCreateModalOpen);
        }
        const onClickCreateModalHandler = () => {
            toggleCreateModal();
            //TODO: adding delete via api and in global state
        }

        //** edit modal
        const toggleEditModal = () => {
            setOpenedEditModal(!isEditModalOpen);
        }
        const handleEditButtonClick =
            (element: TProduct) => {
                setSelectedCategory(element);
                toggleEditModal();
                //TODO: adding delete via api and in global state
            }
        const openEditModal =
            () => {
                toggleEditModal();
                //TODO: adding delete via api and in global state
            }

        return (
            <div className="mt-4 pb-2">
                <HeaderSection title={"Products"} handleFilterParamChange={handleFilterParamChange} filterOptions={filterOptions} onClick={toggleCreateModal} />
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
                                            {item.name}
                                        </span>
                                    </Td>
                                    <Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <span className="font-medium whitespace-nowrap">
                                            {item.description}
                                        </span>
                                    </Td>
                                    <Td className="first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <span className="font-medium whitespace-nowrap">
                                            {parseFloat(item.price.toFixed(2)).toFixed(2)}DA
                                        </span>
                                    </Td>
                                    <Td className="first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <span className="font-medium whitespace-nowrap">
                                            {//TODO: adding category display
                                            }
                                            {"item.category"}
                                        </span>
                                    </Td>

                                    <Td
                                        className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
                                    >
                                        <div className="flex items-center justify-between ">
                                            <div className="flex gap-1 items-end">
                                                <FaEdit onClick={() => handleEditButtonClick(item)} className="text-neutral-900" size={30} strokeWidth={1.8} />
                                                Edit
                                            </div>
                                            <div className="flex gap-1 items-end text-error">
                                                <FaTrashCan onClick={modalDeleteHandler} className="text-error" size={30} strokeWidth={1.8} />
                                                Delete
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
                <CRUDDeleteProductModal title={"Delete Product"} modalHandler={modalDeleteHandler} handleDeleteButtonClick={handleDeleteButtonClick} modalIsOpened={isDeleteModalOpen} />
                <CRUDAddProductModal title={"Add Product"} modalHandler={toggleCreateModal} handleCreateButtonClick={onClickCreateModalHandler} modalIsOpened={isCreateModalOpen} action="create" />
                <CRUDEditProductModal title={"Edit Product"} modalHandler={openEditModal} handleDeleteButtonClick={openEditModal} modalIsOpened={isEditModalOpen} data={selectedProductForEdit} />
            </div>
        )
    }

export default ProductTable

