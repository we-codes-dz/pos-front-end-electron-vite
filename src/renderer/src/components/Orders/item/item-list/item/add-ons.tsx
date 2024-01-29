import { cn } from "@nextui-org/react"
import { useState } from "react"

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
        }
        const addonsDoesExist = addOns && addOns?.length > 0
        return (
            <div
                className={cn(
                    'ps-1 mb-2',
                    { 'hover:cursor-pointer': addonsDoesExist }
                )}
                onClick={onIndicatorClick}>
                <div className='indicator text-sm flex'>
                    {addonsDoesExist && <span className='indicator-item badge badge-error text-white'>{addOns?.length}</span>}
                    <div className="flex gap-2">
                        <span>Add Ons:</span>
                        {addonsDoesExist && <span className="text-blue-600 text-sm" onClick={() => setShow(!isShowed)}>{isShowed ? 'hide' : 'show'}</span>}
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