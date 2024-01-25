import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import SpinnerComponent from "@renderer/components/Spinner/Spinner";
import ErrorMessage from "@renderer/components/inputs/ErrorMessage/ErrorMessage";
import ReusableInput from "@renderer/components/inputs/input/custom-input";
import { noteSchema } from "@renderer/types/form-schema";
import { cn } from "@renderer/utils/helper";
import { useState } from "react";
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

        const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
                console.log('submit')
                confirmDeletingHandler(data);
                reset();
                modalHandler();
                setIsSubmitting(false)
            }
        const cancelHandler = () => {
            reset();
            modalHandler();
        }
        return (
            <div className="font-medium text-lg">
                <form onSubmit={handleSubmit((data) => handlerSubmit(data))} className="p-2 space-y-4">
                    <ReusableInput label='Note' >
                        <textarea rows={3} placeholder="Note..." className="textarea input-bordered w-full" {...register('note')} />
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