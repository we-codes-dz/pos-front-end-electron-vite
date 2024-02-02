import { cn } from "@renderer/utils/helper"

type TProps = {
    indicatorNumber: number
    className?: string
}
const Indicator =
    ({ indicatorNumber, className }: TProps) => {
        return (
            <span className={cn(
                'indicator-item badge badge-error text-white',
                className
            )}>
                {indicatorNumber}
            </span>
        )
    }

export default Indicator