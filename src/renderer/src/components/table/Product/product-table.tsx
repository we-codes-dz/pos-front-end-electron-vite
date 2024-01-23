import { TProduct } from '@renderer/types/type-schema'
import { ProductOrderBy, orderProducts } from '@renderer/utils/filter'
import { ChangeEvent, useEffect, useState } from 'react'
import CRUDAddProductModal from '../../modal/product/add/crud-modal'
import CRUDDeleteProductModal from '../../modal/product/delete/crud-modal'
import CRUDEditProductModal from '../../modal/product/edit/edit-modal'
import { Table, Tbody } from '../common'
import HeaderSection from '../common/header-section'
import { Pagination } from '../common/pagination/pagination'
import TableHeader from '../common/table/category-table-header'
import { AxiosInstance } from 'axios'
import ProductTableRow from './product-table-row'
import { useBoundStore } from '@renderer/stores/store'
import { useAddProduct, useDeleteProduct, useUpdateProduct } from '@renderer/api/hooks/useProducts'
import { unstable_batchedUpdates } from 'react-dom'
//TODO: add pagination logic

export interface ColumnHeaderInt {
  key: string
  label: string
}

interface Props {
  headers: ColumnHeaderInt[]
  products: TProduct[]
  axiosInstance: AxiosInstance
}
const FilterParameter = ProductOrderBy
const ProductTable = ({ headers, products, axiosInstance }: Props) => {
  const filterOptions = [
    { label: 'Date', value: 'Date' },
    { label: 'Name', value: 'Name' }
  ]
  const [selectedFilterParam, setSelectedFilterParam] = useState<ProductOrderBy>(
    FilterParameter.Empty
  )
  const [productData, setProductData] = useState<TProduct[]>(products)
  const [isDeleteModalOpen, setOpenedDeleteModal] = useState<boolean>(false)
  const [isCreateModalOpen, setOpenedCreateModal] = useState<boolean>(false)
  const [isEditModalOpen, setOpenedEditModal] = useState<boolean>(false)

  const { dataInputs, setInputs, reset } = useBoundStore((state) => state)
  const addProduct = useAddProduct(axiosInstance, reset)
  const deleteProduct = useDeleteProduct(axiosInstance)
  const editProduct = useUpdateProduct(axiosInstance, reset)
  const [currentPage, setCurrentPage] = useState(1)
  // Show 8 products per page
  const itemsPerPage = 9
  // Logic to slice array for current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem)
  // Total pages
  const totalPages = Math.ceil(productData.length / itemsPerPage)

  //? selectedProductForEdit is variable used to display data in edit product modal
  const [selectedProductForEdit, setSelectedCategory] = useState<TProduct>()

  const [deletedItemId, setDeletedItemId] = useState<number>()
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
    const updatedData = orderProducts(products, selectedFilterParam) as TProduct[]
    setProductData(updatedData)
  }, [selectedFilterParam])

  //? modal logic
  //** delete modal
  const modalDeleteHandler = () => {
    setOpenedDeleteModal(!isDeleteModalOpen)
  }

  // TODO: do api logic of the delete here
  const handleDeleteButtonClick = () => {
    console.log('id of the item to delete it :', deletedItemId)
    if (deletedItemId) {
      deleteProduct.mutate(deletedItemId!)
    }
  }

  //** create modal
  const toggleCreateModal = () => {
    setOpenedCreateModal(!isCreateModalOpen)
  }

  const handleAddButtonSubmit = async () => {
    console.log('entered to submit data')
    if (dataInputs) {
      console.log('before mutate')
      addProduct.mutate(dataInputs)
    }
  }

  //** edit modal
  const toggleEditModal = () => {
    setOpenedEditModal(!isEditModalOpen)
  }
  const handleEditButtonClick = (element: TProduct) => {
    setSelectedCategory(element)
    toggleEditModal()
    //TODO: adding delete via api and in global state
  }
  const openEditModal = () => {
    toggleEditModal()
    //TODO: adding delete via api and in global state
  }

  return (
    <div className="mt-4 pb-2">
      <HeaderSection
        title={'Products'}
        handleFilterParamChange={handleFilterParamChange}
        filterOptions={filterOptions}
        onClick={toggleCreateModal}
      />
      {
        //? ************Table
      }
      total pages : {totalPages}
      <div className=" overflow-auto intro-y lg:overflow-visible ">
        <Table className="border-spacing-y-[10px] border-separate ">
          <TableHeader headers={headers} />
          <Tbody>
            {currentItems?.map((item, fakerKey) => (
              <ProductTableRow
                product={item}
                key={fakerKey}
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
      <CRUDDeleteProductModal
        title={'Delete Product'}
        modalHandler={modalDeleteHandler}
        handleDeleteButtonClick={handleDeleteButtonClick}
        modalIsOpened={isDeleteModalOpen}
      />
      <CRUDAddProductModal
        title={'Add Product'}
        modalHandler={toggleCreateModal}
        handleAddButtonSubmit={handleAddButtonSubmit}
        setDataInputs={setInputs}
        modalIsOpened={isCreateModalOpen}
      />
      <CRUDEditProductModal
        title={'Edit Product'}
        modalHandler={openEditModal}
        handleDeleteButtonClick={openEditModal}
        modalIsOpened={isEditModalOpen}
        data={selectedProductForEdit}
      />
    </div>
  )
}

export default ProductTable
