import { cn } from '@renderer/utils/helper'
import { ReactNode } from 'react'

type TProps = {
    title: string
    className: string
    children: ReactNode
    onClick?: () => void
}
const TakeInOutButton =
    ({ className, children, title, onClick }: TProps) => {
        return (
            <button className={cn('btn p-1  flex flex-col', className)} onClick={onClick}>
                {children}
                <span>{title}</span>
            </button>
        )

    }

export default TakeInOutButton