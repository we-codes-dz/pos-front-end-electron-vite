import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import SpinnerComponent from "@renderer/components/Spinner/Spinner";
import ErrorMessage from "@renderer/components/inputs/ErrorMessage/ErrorMessage";
import ReusableInput from "@renderer/components/inputs/input/custom-input";
import { serverSchema } from "@renderer/types/form-schema";
import { TServer } from "@renderer/types/type-schema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof serverSchema>


interface Props {
    btnClassName?: string;
    modalHandler: () => void;
    data?: TServer;
    onClickHandler: (data: any) => void
}
const ModalBody =
    ({ modalHandler, onClickHandler, data }: Props) => {
        const [isSubmitting, setSubmitting] = useState<boolean>(false);

        //? form control logic
        const {
            register,
            handleSubmit,
            reset,
            setValue,
            formState: { errors }
        } = useForm<Inputs>({
            mode: 'onSubmit',
            defaultValues: {
                fullName: data?.fullName,
            },
            resolver: zodResolver(serverSchema),
        })



        useEffect(() => {
            if (data) {
                const { fullName } = data
                setValue('fullName', fullName)

            }
        }, [data, setValue])

        //? 
        const handlerSubmit =
            async (data: Inputs) => {
                try {
                    onClickHandler(data)
                    //? enabling the spinner
                    setSubmitting(true);
                    //? resetting the form after action 
                    reset()
                    //? closing the modal
                    modalHandler();
                    //? adding api logic

                    //? disenabling the spinner
                    setSubmitting(false);

                } catch (error) {
                    console.log(error);
                    modalHandler();
                }
            }


        if (!data) return null;
        return (
            <form onSubmit={handleSubmit((data) => handlerSubmit(data))} className="p-4 space-y-4">
                {/* <!-- name Input --> */}
                <ReusableInput label='Server Name' >
                    <input type="text" placeholder="Server Name..." className="input input-bordered w-full" {...register('fullName')} />
                    {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
                </ReusableInput>
                {/* <!-- name Input end --> */}


                {/* <!-- Login Button --> */}
                <div className='pt-6 flex gap-2 items-center w-full justify-end'>
                    <Button
                        type="button"
                        onClick={() => {
                            reset();
                            modalHandler();
                        }}
                        radius="sm"
                        className="w-1/3 text-slate-800 bg-neutral border">
                        Cancel
                    </Button>
                    <Button type='submit' radius="sm" className="w-1/3 text-white bg-info ">
                        Send {isSubmitting && <SpinnerComponent />}
                    </Button>
                </div>
            </form>
        );
    }

export default ModalBody