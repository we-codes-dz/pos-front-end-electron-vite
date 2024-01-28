import { useAddServer, useDeleteServer, useUpdateServer } from '@renderer/api/hooks/useServers'
import { useBoundStore } from '@renderer/stores/store'
import { TServer } from '@renderer/types/type-schema'
import { ServerOrderBy, orderServers } from '@renderer/utils/filter'
import { AxiosInstance } from 'axios'
import { useEffect, useState } from 'react'
import CRUDAddServerModal from '../../modal/servers/add/crud-modal'
import CRUDDeleteServerModal from '../../modal/servers/delete/crud-modal'
import CRUDEditServerModal from '../../modal/servers/edit/edit-modal'
import { Table, Tbody } from '../common'
import HeaderSection from '../common/header-section'
import { Pagination } from '../common/pagination/pagination'
import TableHeader from '../common/table/category-table-header'
import ServerTableRow from './server-table-row'
//TODO: add pagination logic

export interface ColumnHeaderInt {
  key: string
  label: string
}

interface Props {
  title?: string
  headers: ColumnHeaderInt[]
  servers: TServer[]
  axiosInstance: AxiosInstance
}
const FilterParameter = ServerOrderBy

const ServerTable = ({ title, headers, servers, axiosInstance }: Props) => {
  const filterOptions = [
    { label: 'Date', value: 'Date' },
    { label: 'Name', value: 'Name' }
  ]
  const [selectedFilterParam, setSelectedFilterParam] = useState<ServerOrderBy>(
    FilterParameter.Name
  )
  const [serverData, setServerData] = useState<TServer[]>(servers)
  const [isDeleteModalOpen, setOpenedDeleteModal] = useState<boolean>(false)
  const [isCreateModalOpen, setOpenedCreateModal] = useState<boolean>(false)
  const [isEditModalOpen, setOpenedEditModal] = useState<boolean>(false)
  const [isItemDeleted, setIsItemDeleted] = useState<boolean>(false)

  const { dataInputs, setInputs, reset } = useBoundStore((state) => state)
  const addServer = useAddServer(axiosInstance, reset)
  const deleteServer = useDeleteServer(axiosInstance)
  const editServer = useUpdateServer(axiosInstance, reset)
  const [currentPage, setCurrentPage] = useState(1)
  // Show 8 products per page
  const itemsPerPage = 9
  // Logic to slice array for current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = serverData.slice(indexOfFirstItem, indexOfLastItem)
  // Total pages
  const totalPages = Math.ceil(serverData.length / itemsPerPage)

  //? selectedServerForEdit is variable used to display data in edit product modal
  const [selectedServerForEdit, setSelectedServer] = useState<TServer>()

  const [deletedItemId, setDeletedItemId] = useState<number>()
  /* /**
   * Updates the filter parameter based on the selected value.
   * @param e - The change event from the select element.
   */
  const handleFilterParamChange = () => {
    // Extract the selected value from the event
    const newFilterParam = FilterParameter.Name
    // Set the new filter parameter
    setSelectedFilterParam(newFilterParam)
  }

  useEffect(() => {
    const updatedData = orderServers(servers, selectedFilterParam) as TServer[]
    setServerData(updatedData)
  }, [selectedFilterParam, servers, isItemDeleted])

  useEffect(() => {
    handleAddButtonSubmit()
  }, [isCreateModalOpen, dataInputs])

  //? modal logic
  //** delete modal
  const modalDeleteHandler = () => {
    setOpenedDeleteModal(!isDeleteModalOpen)
  }

  // TODO: do api logic of the delete here
  const handleDeleteButtonClick = () => {
    if (deletedItemId) {
      deleteServer.mutate(deletedItemId!)
      setIsItemDeleted(prev => !prev)
    }
  }

  //** create modal
  const toggleCreateModal = () => {
    setOpenedCreateModal(!isCreateModalOpen)
  }

  const handleAddButtonSubmit = async () => {
    if (dataInputs) {
      addServer.mutate(dataInputs)
    }
  }

  //** edit modal
  const toggleEditModal = () => {
    setOpenedEditModal(!isEditModalOpen)
  }
  const handleEditButtonClick = (element: TServer) => {
    setSelectedServer(element)
    toggleEditModal()
    //TODO: adding delete via api and in global state
  }
  const openEditModal = () => {
    toggleEditModal()
    //TODO: adding delete via api and in global state
  }

  const handleEditSubmit = (data: any) => {
    const product = { id: selectedServerForEdit!.id, ...data }
    editServer.mutate(product)
  }

  return (
    <div className="mt-4 pb-2">
      <HeaderSection
        title={title ? title : 'Table'}
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
              <ServerTableRow
                server={item}
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
      <CRUDDeleteServerModal
        title={'Delete Server'}
        modalHandler={modalDeleteHandler}
        handleDeleteButtonClick={handleDeleteButtonClick}
        modalIsOpened={isDeleteModalOpen}
      />
      <CRUDAddServerModal
        title={'Add Server'}
        modalHandler={toggleCreateModal}
        handleAddButtonSubmit={handleAddButtonSubmit}
        setDataInputs={setInputs}
        modalIsOpened={isCreateModalOpen}
      />
      <CRUDEditServerModal
        title={'Edit Server'}
        modalHandler={openEditModal}
        handleEditButtonClick={(data) => handleEditSubmit(data)}
        modalIsOpened={isEditModalOpen}
        data={selectedServerForEdit}
      />
    </div>
  )
}

export default ServerTable
