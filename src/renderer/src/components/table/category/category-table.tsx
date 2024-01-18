//import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

import { FaEdit } from "react-icons/fa";;
import { FaTrashCan } from "react-icons/fa6";
import { ChangeEvent, useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "../common";
import HeaderSection from "../common/header-section";
import CRUDDeleteCategoryModal from "../../modal/category/delete/crud-modal";
import CRUDAddCategoryModal from "../../modal/category/add/crud-modal";
import CRUDEditCategoryModal from "../../modal/category/edit/edit-modal";
import { Pagination } from "../common/pagination/pagination";
import { TCategory, TColumn } from '@renderer/types/type-schema';
import { cn } from '@renderer/utils/helper';
import { CategoryOrderBy, orderCategories } from "@renderer/utils/filter";


interface Props {
    categoryColumns: TColumn[];
    categories: TCategory[];
}
const FilterParameter = CategoryOrderBy;
const CategoryTable =
    ({ categoryColumns, categories }: Props) => {

        const filterOptions = [
            { label: "Date", value: "Date" },
            { label: "Name", value: "Name" },
        ]
        const [selectedFilterParam, setSelectedFilterParam] = useState<CategoryOrderBy>(FilterParameter.Empty);
        const [categoryData, setCategoryData] = useState<TCategory[]>(categories);
        const [isDeleteModalOpen, setOpenedDeleteModal] = useState<boolean>(false);
        const [isCreateModalOpen, setOpenedCreateModal] = useState<boolean>(false);
        const [isEditModalOpen, setOpenedEditModal] = useState<boolean>(false);


        const [currentPage, setCurrentPage] = useState(1);
        // Show 8 products per page  
        const itemsPerPage = 7;
        // Logic to slice array for current page
        // Total pages 
        const totalPages = Math.ceil(categoryData.length / itemsPerPage);


        //? selectedCategoryForEdit is variable used to display data in edit category modal
        const [selectedCategoryForEdit, setSelectedCategory] = useState<TCategory>();

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
            const updatedData = orderCategories(categories, selectedFilterParam) as TCategory[];
            setCategoryData(updatedData);
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
            (element: TCategory) => {
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
            <div className="mt-4">
                <HeaderSection title={"Categories"} handleFilterParamChange={handleFilterParamChange} filterOptions={filterOptions} onClick={toggleCreateModal} />
                {//? ************Table
                }
                <div className=" overflow-auto intro-y lg:overflow-visible ">
                    <Table className="border-spacing-y-[10px] border-separate ">
                        <Thead>
                            <Tr>
                                {categoryColumns.map((item) => (
                                    <Th key={item.key} className={cn(
                                        { "text-center": item.label === 'Actions' },
                                        "border-b-0 whitespace-nowrap"
                                    )}>
                                        {item.label}
                                    </Th>
                                ))
                                }
                            </Tr>
                        </Thead>
                        <Tbody>
                            {categoryData?.map((item, fakerKey) => (
                                <Tr key={fakerKey} className="intro-x">
                                    <Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                                    //onClick={() => handleEditButtonClick(item)}
                                    //onClick={toggleEditModal}
                                    >
                                        <span className="font-medium whitespace-nowrap">
                                            {item.name}
                                        </span>
                                    </Td>
                                    <Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <span className="font-medium whitespace-nowrap">
                                            {item.parent ? item?.parent[0].name : "no"}
                                        </span>
                                    </Td>
                                    <Td className="first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <span className="font-medium whitespace-nowrap">
                                            {item.children ? item?.children[0].name : "no"}
                                        </span>
                                    </Td>
                                    <Td
                                        className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
                                    >
                                        <div className="flex items-center justify-between ">
                                            <div className="flex gap-1 items-end text-neutral-900">
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
                <CRUDDeleteCategoryModal title={"Delete item"} modalHandler={modalDeleteHandler} handleDeleteButtonClick={handleDeleteButtonClick} modalIsOpened={isDeleteModalOpen} />
                <CRUDAddCategoryModal title={"Add Category"} modalHandler={toggleCreateModal} handleCreateButtonClick={onClickCreateModalHandler} modalIsOpened={isCreateModalOpen} action="create" />
                <CRUDEditCategoryModal title={"Edit Category"} modalHandler={openEditModal} handleDeleteButtonClick={openEditModal} modalIsOpened={isEditModalOpen} data={selectedCategoryForEdit} />
            </div>
        )
    }

export default CategoryTable