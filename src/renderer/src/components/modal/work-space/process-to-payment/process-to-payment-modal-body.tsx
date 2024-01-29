import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import SpinnerComponent from "@renderer/components/Spinner/Spinner";
import ErrorMessage from "@renderer/components/inputs/ErrorMessage/ErrorMessage";
import ReusableInput from "@renderer/components/inputs/input/custom-input";
import { useBoundStore } from "@renderer/stores/store";
import { noteSchema } from "@renderer/types/form-schema";
import { calculateTotalPrice, cn } from "@renderer/utils/helper";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
    btnClassName?: string;
    modalHandler: () => void;
    confirmDeletingHandler: (data: { note: string }) => void;
}
type Inputs = z.infer<typeof noteSchema>

const ModalBody =
    ({ modalHandler, confirmDeletingHandler, btnClassName }: Props) => {
        const { currentOrder } = useBoundStore(set => set)

        //if (!currentOrder) 
        const total = calculateTotalPrice(currentOrder?.items!);
        console.log(currentOrder, total)

        const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
        const [calculatedTotal, setCalculatedTotal] = useState<number>(calculateTotalPrice(currentOrder?.items!));
        const [isErrorShowed, setError] = useState<boolean>(false);
        const {
            register,
            handleSubmit,
            reset,
            formState: { errors }
        } = useForm<Inputs>({
            mode: 'onSubmit',
            resolver: zodResolver(noteSchema)
        })

        const handlerSubmit =
            (data: Inputs) => {
                setIsSubmitting(true)
                confirmDeletingHandler(data);
                reset();
                modalHandler();
                setIsSubmitting(false)
            }
        const cancelHandler = () => {
            reset();
            modalHandler();
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const receivedMoney = parseInt(e.target.value)
            setCalculatedTotal(receivedMoney - total)
            if (receivedMoney - total < 0) setError(true)
            else setError(false)
        }
        return (
            <div className="font-medium text-lg">
                <form onSubmit={handleSubmit((data) => handlerSubmit(data))} className="p-2 space-y-4">
                    <ReusableInput label='Montant reçu' >
                        <input onChange={onChangeHandler} type="number" className="textarea input-bordered w-full" />
                        {isErrorShowed && <ErrorMessage>Veuillez introduire plus d'argent !  </ErrorMessage>}
                    </ReusableInput>
                    <ReusableInput label='Change returned' >
                        <input value={total} type="number" className="textarea input-bordered w-full" disabled />
                        {errors.note && <ErrorMessage>{errors.note.message}</ErrorMessage>}
                    </ReusableInput>
                    <ReusableInput label='Change returned' >
                        <input value={calculatedTotal} type="number" className="textarea input-bordered w-full" />
                        {errors.note && <ErrorMessage>{errors.note.message}</ErrorMessage>}
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
                        >Send{isSubmitting && <SpinnerComponent />}</Button>
                    </div>
                </form>
            </div>
        )
    }

export default ModalBody