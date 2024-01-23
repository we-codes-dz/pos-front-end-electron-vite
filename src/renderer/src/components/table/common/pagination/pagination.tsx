import { cn } from '@renderer/utils/helper'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange(page: number): void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Logic to display page numbers
  // and call onPageChange on click

  return (
    <div className="join">
      <button
        disabled={currentPage === 1}
        className="join-item btn btn-outline"
        onClick={() => onPageChange(currentPage - 1)}
      >
        «
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={cn('join-item btn', { 'btn-active': i + 1 === currentPage })}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        className={cn('join-item btn btn-outline', {
          'disabled btn-primary': currentPage === totalPages
        })}
        onClick={() => onPageChange(currentPage + 1)}
      >
        »
      </button>
    </div>
  )
}
