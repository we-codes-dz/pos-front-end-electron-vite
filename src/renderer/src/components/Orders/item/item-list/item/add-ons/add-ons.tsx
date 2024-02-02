import { cn } from "@nextui-org/react"
import { useState } from "react"
import Indicator from "../../../../../indicator/indicator"

type TProps = {
    clickHandler: () => void
    display: boolean
    addOns: string[] | undefined
}
const AddOns =
    ({ clickHandler, display, addOns }: TProps) => {
        const [isShowed, setShow] = useState<boolean>(false)
        const onIndicatorClick = (e: any) => {
            //? to not apply  parent style on child
            e.stopPropagation()
            clickHandler()
            setShow(!isShowed)
        }
        const addonsDoesExist = addOns && addOns?.length > 0
        return (
            <div
                className={cn(
                    'ps-1 mb-2'
                )}
            >
                <div className='indicator text-sm flex'>
                    {addonsDoesExist && <Indicator indicatorNumber={addOns.length} />}
                    <div className="flex gap-2">
                        <span>Add Ons:</span>
                        {addonsDoesExist && <span className={cn("text-blue-600 text-sm", { 'hover:cursor-pointer': addonsDoesExist })} onClick={onIndicatorClick}>{isShowed ? 'hide' : 'show'}</span>}
                    </div>
                </div>
                {addonsDoesExist && display && <div className="flex flex-wrap gap-1 text-xs text-slate-600 ">
                    {addOns?.map((addon, index) => (
                        <div key={index}>
                            <span>{addon}</span>,
                        </div>
                    ))
                    }
                </div>
                }
            </div>
        )
    }

export default AddOns