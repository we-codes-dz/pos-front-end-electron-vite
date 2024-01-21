//import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

import { useBoundStore } from '@renderer/stores/store'
import { TCategory } from '@renderer/types/type-schema'
import { CategoryOrderBy, orderCategories } from '@renderer/utils/filter'
import { ChangeEvent, useEffect, useState } from 'react'
import CRUDAddCategoryModal from '../../modal/category/add/crud-modal'
import CRUDDeleteCategoryModal from '../../modal/category/delete/crud-modal'
import CRUDEditCategoryModal from '../../modal/category/edit/edit-modal'
import { Table, Tbody } from '../common'
import HeaderSection from '../common/header-section'
import { Pagination } from '../common/pagination/pagination'
import TableHeader from '../common/table/category-table-header'
import CategoryTableRow from './category-table-row'
import { ColumnHeaderInt } from '../sales/sale-table'
interface Props {
    categoryColumns: ColumnHeaderInt[]
    categories: TCategory[]
}
const FilterParameter = CategoryOrderBy
const CategoryTable = ({ categoryColumns, categories }: Props) => {
    const filterOptions = [
        { label: 'Date', value: 'Date' },
        { label: 'Name', value: 'Name' }
    ]
    const [selectedFilterParam, setSelectedFilterParam] = useState<CategoryOrderBy>(
        FilterParameter.Empty
    )

    const [categoryData, setCategoryData] = useState<TCategory[]>(categories)
    const [isDeleteModalOpen, setOpenedDeleteModal] = useState<boolean>(false)
    const [isCreateModalOpen, setOpenedCreateModal] = useState<boolean>(false)
    const [isEditModalOpen, setOpenedEditModal] = useState<boolean>(false)

    //? create data state
    const [dataInputs, setDataInputs] = useState<FormData>();

    const { categoryFilterKey } = useBoundStore((state) => state)
    //   const [currentPage, setCurrentPage] = useState(1)
    // Show 8 products per page
    //   const itemsPerPage = 7
    // Logic to slice array for current page
    // Total pages
    //   const totalPages = Math.ceil(categoryData.length / itemsPerPage)

    //? selectedCategoryForEdit is variable used to display data in edit category modal
    const [selectedCategoryForEdit, setSelectedCategory] = useState<TCategory>()

    /* /**
     * Updates the filter parameter based on the selected value.
     * @param e - The change event from the select element.
     */
    const handleFilterParamChange = (e: ChangeEvent<HTMLSelectElement>) => {
        // Extract the selected value from the event
        const selectedValue = e.target.value
        // Map the selected value to the corresponding FilterParameter enum
        const newFilterParam = selectedValue === 'Name' ? FilterParameter.Name : FilterParameter.Empty
        // Set the new filter parameter
        setSelectedFilterParam(newFilterParam)
    }

    useEffect(() => {
        const updatedData = orderCategories(categories, selectedFilterParam) as TCategory[]
        setCategoryData(updatedData)
    }, [selectedFilterParam, categories])



    //? display data coming from the create modal 
    useEffect(() => {
        if (dataInputs) {
            for (const value of dataInputs.values()) {
                console.log(value);
            }
        }
    }, [isCreateModalOpen, dataInputs]);




    //? modal logic
    //** delete modal
    const modalDeleteHandler = () => {
        setOpenedDeleteModal(!isDeleteModalOpen)
    }
    const handleDeleteButtonClick = () => {
        modalDeleteHandler()
        //TODO: adding delete via api and in global state
    }


    //** create modal
    const toggleCreateModal = () => {
        console.log('onClickCreateModel called')
        //console.log(dataInputs)
        setOpenedCreateModal(!isCreateModalOpen)
    }

    //** edit modal
    const toggleEditModal = () => {
        setOpenedEditModal(!isEditModalOpen)
    }
    const handleEditButtonClick = (element: TCategory) => {
        setSelectedCategory(element)
        toggleEditModal()
        //TODO: adding delete via api and in global state
    }
    const openEditModal = () => {
        toggleEditModal()
        //TODO: adding delete via api and in global state
    }

    return (
        <div className="mt-4">
            <HeaderSection
                title={'Categories'}
                handleFilterParamChange={handleFilterParamChange}
                filterOptions={filterOptions}
                onClick={toggleCreateModal}
            />
            {
                //? ************Table
            }
            <div className=" overflow-auto intro-y lg:overflow-visible ">
                <Table className="border-spacing-y-[10px] border-separate ">
                    <TableHeader headers={categoryColumns} />
                    <Tbody>
                        {categoryData?.map((item, fakerKey) => (
                            <CategoryTableRow
                                key={fakerKey}
                                category={item}
                                handleEditButtonClick={() => handleEditButtonClick(item)}
                                modalDeleteHandler={modalDeleteHandler}
                            />
                        ))}
                    </Tbody>
                </Table>
                <div className="flex justify-center mt-3">
                    <Pagination
                        currentPage={categoryFilterKey.page!}
                        totalPages={categoryFilterKey.limit!}
                    // onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
            <CRUDDeleteCategoryModal
                title={'Delete item'}
                modalHandler={modalDeleteHandler}
                handleDeleteButtonClick={handleDeleteButtonClick}
                modalIsOpened={isDeleteModalOpen}
            />
            <CRUDAddCategoryModal
                title={'Add Category'}
                modalHandler={toggleCreateModal}
                setDataInputs={setDataInputs}
                modalIsOpened={isCreateModalOpen}
            />
            <CRUDEditCategoryModal
                title={'Edit Category'}
                modalHandler={openEditModal}
                handleDeleteButtonClick={openEditModal}
                modalIsOpened={isEditModalOpen}
                data={selectedCategoryForEdit}
            />
        </div>
    )
}

export default CategoryTable
