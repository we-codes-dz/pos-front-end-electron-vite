import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useBoundStore } from "@renderer/stores/store";
import { noteSchema } from "@renderer/types/form-schema";
import { cn } from "@renderer/utils/helper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Supplies from './supplies';



interface Props {
    btnClassName?: string;
    modalHandler: () => void;
    confirmDeletingHandler: (data: { note: string }) => void;
}
type Inputs = z.infer<typeof noteSchema>

const ModalBody =
    ({ modalHandler, btnClassName }: Props) => {
        const { currentOrder } = useBoundStore(set => set)
        //? 1st select ur specific supplies of the product
        const {
            register,
            handleSubmit,
            reset,
            formState: { errors }
        } = useForm<Inputs>({
            mode: 'onSubmit',
            resolver: zodResolver(noteSchema)
        })

        const handlerSubmit = () => {
            console.log('currentOrder : ', currentOrder)
        }
        const cancelHandler = () => {
            reset();
            modalHandler();
        }
        return (
            <div className="font-medium text-lg p-3 relative">
                <Supplies />
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
                        type="button"
                        onClick={handlerSubmit}
                    >Send</Button>
                </div>
            </div>
        )
    }

export default ModalBody