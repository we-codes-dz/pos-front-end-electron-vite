import { useBoundStore } from '@renderer/stores/store'
import { cn } from '@renderer/utils/helper'

type PaginationProps = {
  currentPage: number
  totalPages: number
  limit: number
  //   onPageChange(page: number): void
}

export const Pagination = ({
  currentPage,
  limit,
  totalPages
  // onPageChange
}: PaginationProps) => {
  // Logic to display page numbers
  // and call onPageChange on click
  const { setCategoryFilterKey } = useBoundStore((state) => state)
  return (
    <div className="join">
      <button
        disabled={currentPage === 1}
        className="join-item btn btn-outline"
        onClick={() =>
          setCategoryFilterKey({ page: currentPage - 1, limit: limit, totalPages: totalPages })
        }
      >
        «
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={cn('join-item btn', { 'btn-active': i + 1 === currentPage })}
          onClick={() =>
            setCategoryFilterKey({ page: i + 1, limit: limit, totalPages: totalPages })
          }
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        className={cn('join-item btn btn-outline', {
          'disabled btn-primary': currentPage === totalPages
        })}
        onClick={() =>
          setCategoryFilterKey({ page: currentPage + 1, limit: limit, totalPages: totalPages })
        }
      >
        »
      </button>
    </div>
  )
}
