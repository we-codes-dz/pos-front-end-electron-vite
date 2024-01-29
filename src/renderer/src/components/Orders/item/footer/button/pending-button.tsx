import { cn } from "@renderer/utils/helper"
import { ReactNode } from "react"

type TProps = {
    onClick?: () => void
    className?: string
    children?: ReactNode
    title: string
}
const PayPendingButton =
    ({ onClick, className, children, title }: TProps) => {
        return (
            <div
                className={cn(
                    "px-4 py-4 rounded-md shadow-lg text-center btn text-white font-semibold ",
                    className
                )}
                onClick={onClick}
            >
                {title}
                {children}
            </div>
        )
    }

export default PayPendingButton