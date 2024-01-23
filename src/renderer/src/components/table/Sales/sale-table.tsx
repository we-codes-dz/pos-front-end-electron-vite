import SaleInformationModal from '@renderer/components/modal/sales/information/crud-modal'
import { TProduct } from '@renderer/types/type-schema'
import { useEffect, useState } from 'react'
import { Table, Tbody } from '../common'
import Header from '../common/header'
import { Pagination } from '../common/pagination/pagination'
import TableHeader from '../common/table/category-table-header'
import SaleTableRow from './sale-table-row'

//TODO: add pagination logic

export interface ColumnHeaderInt {
  key: string
  label: string
}

interface Props {
  headers: ColumnHeaderInt[]
  sales: TProduct[]
}
const SalesTable = ({ headers, sales }: Props) => {
  const [salesData, setSalesData] = useState<any[]>(sales)
  const [SelectedSale, setSelectedSale] = useState()
  const [isDeleteModalOpen, setOpenedDeleteModal] = useState<boolean>(false)

  const [currentPage, setCurrentPage] = useState(1)
  // Show 8 sales per page
  const itemsPerPage = 7
  // Logic to slice array for current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = salesData.slice(indexOfFirstItem, indexOfLastItem)
  // Total pages
  const totalPages = Math.ceil(salesData.length / itemsPerPage)

  useEffect(() => {
    setSalesData(sales)
  }, [salesData])

  //? modal logic
  const modalHandler = () => {
    setOpenedDeleteModal(!isDeleteModalOpen)
  }

  const handleInfoButtonClick = (element: any) => {
    setSelectedSale(element)
    setOpenedDeleteModal(!isDeleteModalOpen)
  }

  return (
    <div className="mt-4 pb-2">
      <div className="flex justify-between items-center w-full ">
        <Header title={'Sales'} />
      </div>
      {
        //? ************Table
      }
      total pages : {totalPages}
      <div className=" overflow-auto intro-y lg:overflow-visible ">
        <Table className="border-spacing-y-[10px] border-separate ">
          <TableHeader headers={headers} />
          <Tbody>
            {currentItems?.map((item, fakerKey) => (
              <SaleTableRow
                key={fakerKey}
                sale={item}
                handleInfoButtonClick={() => handleInfoButtonClick(item)}
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
      {SelectedSale && (
        <SaleInformationModal
          title={'Information'}
          modalHandler={modalHandler}
          modalIsOpened={isDeleteModalOpen}
          data={SelectedSale}
        />
      )}
    </div>
  )
}

export default SalesTable
