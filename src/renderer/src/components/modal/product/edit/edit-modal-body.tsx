import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import SpinnerComponent from "@renderer/components/Spinner/Spinner";
import ErrorMessage from "@renderer/components/inputs/ErrorMessage/ErrorMessage";
import ReusableInput from "@renderer/components/inputs/input/custom-input";
import { productSchema } from "@renderer/types/form-schema";
import { TProduct } from "@renderer/types/type-schema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof productSchema>


interface Props {
    btnClassName?: string;
    modalHandler: () => void;
    data?: TProduct;
    onClickHandler: (data: any, avatar: any) => void
}
const ModalBody =
    ({ modalHandler, onClickHandler, data }: Props) => {
        const [isSubmitting, setSubmitting] = useState<boolean>(false);
        const [image, setImage] = useState<any>([])

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
                name: data?.name,
                category: data?.category,
                description: data?.description,
                price: data?.price
            },
            resolver: zodResolver(productSchema),
        })



        useEffect(() => {
            if (data) {
                const { name, category, description, price } = data
                setValue('name', name)
                setValue('category', category)
                setValue('description', description)
                setValue('price', price)

            }
        }, [data, setValue])

        //? 
        const handlerSubmit =
            async (data: Inputs) => {
                try {
                    onClickHandler(data, image)
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


        const imageUploadHandler = (event: any) => {
            if (!event.target.files[0]) return
            setImage(event.target.files[0])
        }

        if (!data) return null;
        return (
            <form onSubmit={handleSubmit((data) => handlerSubmit(data))} className="p-4 space-y-4">
                {/* <!-- name Input --> */}
                <ReusableInput label='Product Name' >
                    <input type="text" placeholder="Product Name..." className="input input-bordered w-full" {...register('name')} />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </ReusableInput>
                {/* <!-- name Input end --> */}

                {/* <!-- description Input --> */}
                <ReusableInput label='Product Name' >
                    <textarea placeholder="Product Name..." className="textarea input-bordered w-full h-24" {...register('description')} />
                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                </ReusableInput>
                { }


                {/* <!-- price Input --> */}
                <ReusableInput label='Price' >
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register('price', {
                            setValueAs: (value) => parseFloat(value)
                        })} />
                    {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
                </ReusableInput>
                {/* <!-- price Input end --> */}


                {//TODO: Add category select
                }
                {/* <!-- category Input --> */}
                <ReusableInput label='Category number' >
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register('category', {
                            setValueAs: (value) => parseFloat(value)
                        })}
                    />
                    {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
                </ReusableInput>
                {/* <!-- category Input end --> */}


                <label className="form-control w-full ">
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                        onChange={(e: any) => imageUploadHandler(e)}
                    />
                </label>


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