import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import SpinnerComponent from '@renderer/components/Spinner/Spinner'
import ErrorMessage from '@renderer/components/inputs/ErrorMessage/ErrorMessage'
import ReusableInput from '@renderer/components/inputs/input/custom-input'
import { categorySchema } from '@renderer/types/form-schema'
import { TCategory } from '@renderer/types/type-schema'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Inputs = z.infer<typeof categorySchema>

type FoodCategory = {
  value: string
  label: string
}

const categories: FoodCategory[] = [
  { value: 'Food', label: 'Food' },
  { value: 'Burgers', label: 'Burgers' },
  { value: 'Pizzas', label: 'Pizzas' },
  { value: 'Sandwiches', label: 'Sandwiches' }
  // Add more categories as needed
]

interface Props {
  btnClassName?: string
  modalHandler: () => void
  data?: TCategory
  onClickHandler: (data: any, avatar: any) => void
}

const ModalBody = ({ modalHandler, onClickHandler, data }: Props) => {
  const [image, setImage] = useState<any>([])
  const [isSubmitting, setSubmitting] = useState<boolean>(false)

  console.log(data)
  //? form control logic
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onSubmit',
    defaultValues: { name: data?.name },
    resolver: zodResolver(categorySchema)
  })

  const imageUploadHandler = (event: any) => {
    if (!event.target.files[0]) return
    setImage(event.target.files[0])
  }

  useEffect(() => {
    if (data) {
      const { name } = data;
      setValue('name', name)
    }
  }, [data])
  //?
  const handlerSubmit = async (data: Inputs) => {
    try {
      onClickHandler(data, image)
      //? enabling the spinner
      setSubmitting(true)
      //? resetting the form after action
      reset()
      //? closing the modal
      //modalHandler()
      //? adding api logic

      //? disenabling the spinner
      setSubmitting(false)
    } catch (error) {
      console.log(error)
      modalHandler()
    }
  }


  if (!data) return null;
  return (
    <form onSubmit={handleSubmit((data) => handlerSubmit(data))} className="p-4 space-y-3">
      {/* <!-- name Input  start--> */}
      <ReusableInput label='Category Name' >
        <input type="text" placeholder="Category Name..." className="input input-bordered w-full" {...register('name')} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </ReusableInput>
      {/* <!-- name Input end --> */}

      <ReusableInput label='Category parent' >
        <select className="select select-bordered" {...register('parent')}>
          {categories.map((item) => (
            <option className="text-black" key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </ReusableInput>

      <label className="form-control w-full ">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered file-input-accent w-full max-w-xs"
          onChange={(e: any) => {
            imageUploadHandler(e)
          }}
        />
      </label>

      <div className="pt-6 flex gap-2 items-center w-full justify-end">
        <Button
          type="button"
          onClick={() => {
            reset()
            modalHandler()
          }}
          radius="sm"
          className="w-1/3 text-slate-800 bg-neutral border"
        >
          Cancel
        </Button>
        <Button type="submit" radius="sm" className="w-1/3 text-white bg-info ">
          Send {isSubmitting && <SpinnerComponent />}
        </Button>
      </div>
    </form>
  )
}

export default ModalBody
