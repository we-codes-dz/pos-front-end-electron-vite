import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import SpinnerComponent from '@renderer/components/Spinner/Spinner'
import ErrorMessage from '@renderer/components/inputs/ErrorMessage/ErrorMessage'
import ReusableInput from '@renderer/components/inputs/input/custom-input'
import { categorySchema } from '@renderer/types/form-schema'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Inputs = z.infer<typeof categorySchema>

type FoodCategory = {
  value: string
  label: string
}

const categories: FoodCategory[] = [
  { value: 'fruit', label: 'Fruits' },
  { value: 'vegetable', label: 'Vegetables' },
  { value: 'grain', label: 'Grains' },
  { value: 'protein', label: 'Proteins' }
  // Add more categories as needed
]

interface Props {
  btnClassName?: string
  modalHandler: () => void
  setDataInputs: (data: any) => void
  handleAddButtonSubmit: () => void
}
const ModalBody = ({ modalHandler, setDataInputs, handleAddButtonSubmit }: Props) => {
  const [image, setImage] = useState<any>([])
  const [hasImage, setHasImage] = useState<boolean>(false);
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  //? form control logic
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onSubmit',
    resolver: zodResolver(categorySchema)
  })

  //?

  const imageUploadHandler = (event: any) => {
    if (!event.target.files[0]) return
    setImage(event.target.files[0])
  }

  const handlerSubmit = async (data: Inputs) => {
    try {
      const dataForm = new FormData()
      if (!image || image.length === 0) {
        setHasImage(true)
        return
      }
      if (image) {
        dataForm.append('name', data.name)
        dataForm.append('avatar', image)
        setDataInputs(dataForm)
        handleAddButtonSubmit()
        //? enabling the spinner
        setSubmitting(true)
        modalHandler()
        //? disenabling the spinner
        setSubmitting(false)
        modalHandler()
        //? resetting the form after action
        reset()
      }

    } catch (error) {
      console.log(error)
      modalHandler()
    }
  }

  return (
    <form onSubmit={handleSubmit((data) => handlerSubmit(data))} className="p-4 space-y-4">
      {/* <!-- name Input --> */}
      <ReusableInput label='Category Name' >
        <input type="text" placeholder="Category Name..." className="input input-bordered w-full" {...register('name')} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </ReusableInput>
      {/* <!-- name Input end --> */}

      <ReusableInput label='Category parent' >
        <select className="select select-bordered" {...register('parent')}>
          <option className="text-black" value="">{""}</option>
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
            setHasImage(false);
          }}
        />
        <div className="label">
          <span className="label-text text-xs">{hasImage && <ErrorMessage>You should choose an image</ErrorMessage>}
          </span>
        </div>
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
