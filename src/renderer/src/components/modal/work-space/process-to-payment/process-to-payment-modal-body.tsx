import { Button } from "@nextui-org/react";
import ErrorMessage from "@renderer/components/inputs/ErrorMessage/ErrorMessage";
import ReusableInput from "@renderer/components/inputs/input/custom-input";
import { useBoundStore } from "@renderer/stores/store";
import { calculateTotalPrice, cn } from "@renderer/utils/helper";
import { ChangeEvent, useState } from "react";

interface Props {
    btnClassName?: string;
    modalHandler: () => void;
    confirmDeletingHandler: (data: { note: string }) => void;
}

const ModalBody =
    ({ modalHandler, btnClassName }: Props) => {
        const currentOrder = useBoundStore(set => set.currentOrder)

        //if (!currentOrder) 
        const total = calculateTotalPrice(currentOrder?.items!);

        //const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
        const [calculatedTotal, setCalculatedTotal] = useState<number>(0);
        const [amountReceived, setAmountReceived] = useState<number>(0);
        const [isErrorShowed, setError] = useState<boolean>(false);
        // const {
        //     handleSubmit,
        //     reset,
        //     formState: { errors }
        // } = useForm<Inputs>({
        //     mode: 'onSubmit',
        //     resolver: zodResolver(noteSchema)
        // })

        // const handlerSubmit =
        //     (data: Inputs) => {
        //         setIsSubmitting(true)
        //         confirmDeletingHandler(data);
        //         reset();
        //         modalHandler();
        //         setIsSubmitting(false)
        //     }
        const cancelHandler = () => {
            setCalculatedTotal(0);
            setAmountReceived(0);
            modalHandler();
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;

            // Remove leading zeros from the input value
            const dataWithoutZero = inputValue.startsWith('0') ? inputValue.slice(1) : inputValue;
            const receivedMoney = parseInt(dataWithoutZero);

            setAmountReceived(receivedMoney)
            setCalculatedTotal(receivedMoney - total)
            if (receivedMoney - total < 0) setError(true)
            else setError(false)
        }
        return (
            <div className="font-medium text-lg">
                <form className="p-2 space-y-4">
                    <ReusableInput label='Amount received' >
                        <input onChange={onChangeHandler} value={amountReceived} type="number" className="textarea input-bordered w-full" />
                        {isErrorShowed && <ErrorMessage>Veuillez introduire plus d'argent !  </ErrorMessage>}
                    </ReusableInput>
                    <ReusableInput label='Change returned' >
                        <input value={total} type="number" className="textarea input-bordered w-full" disabled />
                    </ReusableInput>
                    <ReusableInput label='Change returned' >
                        <input value={calculatedTotal} type="number" className="textarea input-bordered w-full" />
                    </ReusableInput>
                    <div className="modal-action">
                        <Button
                            type='button'
                            className={cn(
                                "text-accent btn bg-neutral border-none",
                            )}
                            onClick={cancelHandler}
                        >Cancel</Button>
                        <Button
                            className={cn(
                                "text-white btn",
                                btnClassName
                            )}
                            type="submit"
                        // >Send{isSubmitting && <SpinnerComponent />}</Button>
                        >Send</Button>
                    </div>
                </form>
            </div>
        )
    }

export default ModalBody