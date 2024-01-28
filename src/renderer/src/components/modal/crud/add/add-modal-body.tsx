import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import SpinnerComponent from "@renderer/components/Spinner/Spinner";
import ErrorMessage from "@renderer/components/inputs/ErrorMessage/ErrorMessage";
import { categorySchema } from "@renderer/types/form-schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof categorySchema>

type FoodCategory = {
    value: string;
    label: string;
};

const categories: FoodCategory[] = [
    { value: 'fruit', label: 'Fruits' },
    { value: 'vegetable', label: 'Vegetables' },
    { value: 'grain', label: 'Grains' },
    { value: 'protein', label: 'Proteins' },
    // Add more categories as needed
];

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
            resolver: zodResolver(categorySchema),
        })


        //? 
        const handlerSubmit =
            async (data: Inputs) => {
                try {
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
                    label="Category Name"
                    placeholder="Category Name..."
                    className="shadow-md overflow-auto rounded-lg"
                    //errorMessage={errors.title && "Title is required"}
                    {...register('name')}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

                <Select
                    label="Parent"
                    className=" text-black w-full"
                    placeholder="Select parent category"
                    {...register('parent')}
                //onChange={(e) => filterByParam(e)}
                >
                    {categories.map((item) => (
                        <SelectItem className="text-black" key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                {/* <!-- Password Input --> */}

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