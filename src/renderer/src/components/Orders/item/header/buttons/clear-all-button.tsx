import { ReactNode } from "react"

type TProps = {
    onClick: () => void
    children: ReactNode
}
const ClearAllButton =
    ({ onClick, children }: TProps) => {
        return (
            <button
                className="px-2 py-2 btn btn-error rounded-md bg-red-100 text-red-500"
                onClick={onClick}
            >
                {children}
            </button>
        )
    }

export default ClearAllButton