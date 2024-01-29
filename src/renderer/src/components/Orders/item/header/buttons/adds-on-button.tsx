import { cn } from "@nextui-org/react"
import { ReactNode } from "react"
type TProps = {
    isItemChosen: boolean
    selectProductId: number
    onClick: () => void
    children: ReactNode
}
const AddsOnOrNoteButton =
    ({ isItemChosen, selectProductId, onClick, children }: TProps) => {
        return (
            <button
                className={cn(
                    "px-2 py-2 rounded-md bg-gray-100 text-gray-800",
                    "btn",
                    { "btn-disabled": !isItemChosen || selectProductId === 0 }
                )
                }
                onClick={onClick}
            >
                {children}
            </button>
        )
    }

export default AddsOnOrNoteButton