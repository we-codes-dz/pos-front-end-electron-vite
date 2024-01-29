//import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

import {
  useAddCategories,
  useDeleteCategory,
  useUpdateCategory
} from '@renderer/api/hooks/useCategories'
import { useBoundStore } from '@renderer/stores/store'
import { TCategory } from '@renderer/types/type-schema'
import { CategoryOrderBy, orderCategories } from '@renderer/utils/filter'
import { AxiosInstance } from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import CRUDAddCategoryModal from '../../modal/category/add/crud-modal'
import CRUDDeleteCategoryModal from '../../modal/category/delete/crud-modal'
import CRUDEditCategoryModal from '../../modal/category/edit/edit-modal'
import { Table, Tbody } from '../common'
import HeaderSection from '../common/header-section'
import { Pagination } from '../common/pagination/pagination'
import TableHeader, { ColumnHeaderInt } from '../common/table/category-table-header'
import CategoryTableRow from './category-table-row'
interface Props {
  title?: string
  categoryColumns: ColumnHeaderInt[]
  categories: TCategory[]
  axiosInstance: AxiosInstance
}
const FilterParameter = CategoryOrderBy
const CategoryTable = ({ title, categoryColumns, categories, axiosInstance }: Props) => {
  const filterOptions = [
    { label: 'Date', value: 'Date' },
    { label: 'Name', value: 'Name' }
  ]
  const [selectedFilterParam, setSelectedFilterParam] = useState<CategoryOrderBy>(
    FilterParameter.Empty
  )

  const { dataInputs, setInputs, reset } = useBoundStore((state) => state)
  const addCategory = useAddCategories(axiosInstance, reset)
  const deleteCategory = useDeleteCategory(axiosInstance)
  const editCategory = useUpdateCategory(axiosInstance, reset)
  const [categoryData, setCategoryData] = useState<TCategory[]>(categories)
  const [isDeleteModalOpen, setOpenedDeleteModal] = useState<boolean>(false)
  const [isCreateModalOpen, setOpenedCreateModal] = useState<boolean>(false)
  const [isEditModalOpen, setOpenedEditModal] = useState<boolean>(false)
  const [deletedItemId, setDeletedItemId] = useState<number>()
  const [isItemDeleted, setIsItemDeleted] = useState<boolean>(false)
  //? create data state
  //   const [dataInputs, setDataInputs] = useState<FormData>()

  const [currentPage, setCurrentPage] = useState(1)
  // Show 8 products per page
  const itemsPerPage = 9
  // Logic to slice array for current page
  // Total pages
  const totalPages = Math.ceil(categoryData.length / itemsPerPage)

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
  }, [selectedFilterParam, categories, isItemDeleted])

  //? display data coming from the create modal
  useEffect(() => {
    handleAddButtonSubmit()
  }, [isCreateModalOpen, dataInputs])

  //? modal logic
  //** delete modal
  const modalDeleteHandler = () => {
    setOpenedDeleteModal(!isDeleteModalOpen)
  }

  const handleDeleteButtonClick = () => {
    if (deletedItemId) {
      deleteCategory.mutate(deletedItemId!)
      setIsItemDeleted((prev) => !prev)
    }
  }

  //** create modal
  const toggleCreateModal = () => {
    setOpenedCreateModal(!isCreateModalOpen)
  }

  const handleAddButtonSubmit = async () => {
    if (dataInputs) {
      console.log(dataInputs)
      addCategory.mutate(dataInputs)
    }
  }

  //** edit modal
  const toggleEditModal = () => {
    setOpenedEditModal(!isEditModalOpen)
  }
  const handleEditButtonClick = (element: TCategory) => {
    setSelectedCategory(element)
    toggleEditModal()
  }
  const openEditModal = () => {
    toggleEditModal()
  }

  const handleEditSubmit = (data: any, avatar: any) => {
    //? add parent id  data.parents
    editCategory.mutate({
      id: selectedCategoryForEdit!.id,
      name: data.name,
      parent: data.parent,
      avatar
    })
  }

  return (
    <div className="mt-4">
      <HeaderSection
        title={title ? title : 'Table'}
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
                catchingId={() => setDeletedItemId(item.id)}
              />
            ))}
          </Tbody>
        </Table>
        <div className="flex justify-center mt-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
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
        handleAddButtonSubmit={handleAddButtonSubmit}
        setDataInputs={setInputs}
        modalIsOpened={isCreateModalOpen}
      />
      <CRUDEditCategoryModal
        title={'Edit Category'}
        modalHandler={openEditModal}
        handleEditButtonClick={(data, avatar) => handleEditSubmit(data, avatar)}
        modalIsOpened={isEditModalOpen}
        data={selectedCategoryForEdit}
      />
    </div>
  )
}

export default CategoryTable
