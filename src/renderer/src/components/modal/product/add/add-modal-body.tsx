import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react"
import SpinnerComponent from "@renderer/components/Spinner/Spinner";
import ErrorMessage from "@renderer/components/inputs/ErrorMessage/ErrorMessage";
import { productSchema } from "@renderer/types/form-schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof productSchema>


interface Props {
    btnClassName?: string;
    modalHandler: () => void;
    action: "create" | "edit";

}
const ModalBody =
    ({ modalHandler }: Props) => {
        const [isSubmitting, setSubmitting] = useState<boolean>(false);

        //? form control logic
        const {
            register,
            handleSubmit,
            reset,
            formState: { errors }
        } = useForm<Inputs>({
            mode: 'onSubmit',
            resolver: zodResolver(productSchema),
        })


        //? 
        const handlerSubmit =
            async (data: Inputs) => {
                try {
                    console.log(data)
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

        return (
            <form onSubmit={handleSubmit((data) => handlerSubmit(data))} className="p-4 space-y-4">

                {/* <!-- name Input --> */}
                <Input
                    type="text"
                    label="Product Name"
                    placeholder="Product Name..."
                    className="shadow-md overflow-auto rounded-lg"
                    //errorMessage={errors.title && "Title is required"}
                    {...register('name')}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}


                <Textarea
                    type="text"
                    label="Description"
                    className="shadow-md overflow-auto rounded-lg"
                    //errorMessage={errors.title && "Title is required"}
                    {...register('description')}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}


                <Input
                    type="number"
                    label="Price"
                    className="shadow-md overflow-auto rounded-lg"
                    //errorMessage={errors.title && "Title is required"}
                    {...register('price')}
                />
                {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}

                {//TODO: Add category select
                }
                <Input
                    type="number"
                    label="Category number"
                    className="shadow-md overflow-auto rounded-lg"
                    //errorMessage={errors.title && "Title is required"}
                    {...register('category')}
                />
                {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}


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
        )
    }

export default ModalBody