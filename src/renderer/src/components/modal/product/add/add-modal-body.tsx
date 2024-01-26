import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import useCategories from '@renderer/api/hooks/useCategories'
import SpinnerComponent from '@renderer/components/Spinner/Spinner'
import ErrorMessage from '@renderer/components/inputs/ErrorMessage/ErrorMessage'
import ReusableInput from '@renderer/components/inputs/input/custom-input'
import ReusableSelect from '@renderer/components/inputs/select/custom-select'
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate'
import { productSchema } from '@renderer/types/form-schema'
import { TCategory } from '@renderer/types/type-schema'
import { getSafeCategoryList } from '@renderer/utils/helper'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Inputs = z.infer<typeof productSchema>

interface Props {
  btnClassName?: string
  modalHandler: () => void
  setDataInputs: (data: any) => void
  handleAddButtonSubmit: () => void
}
const ModalBody = ({ modalHandler, setDataInputs, handleAddButtonSubmit }: Props) => {
  const [image, setImage] = useState<any>([])
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [hasImage, setHasImage] = useState<boolean>(false)

  const axiosInstance = useAxiosPrivate()

  const { data: categories, error, isLoading } = useCategories(axiosInstance)

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (error) return <div>{error.message}</div>


  const categoryList: TCategory[] = getSafeCategoryList(categories);
  //? form control logic
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onSubmit',
    resolver: zodResolver(productSchema)
  })

  //?
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
        dataForm.append('description', data.description)
        dataForm.append('price', data.price.toString())
        dataForm.append('category[id]', data.category.toString())
        setDataInputs(dataForm)
        handleAddButtonSubmit()
        //? enabling the spinner
        setSubmitting(true)
        modalHandler()
        //? disenabling the spinner
        setSubmitting(false)
        reset()
      }
    } catch (error) {
      console.log(error)
      modalHandler()
    }
  }

  const imageUploadHandler = (event: any) => {
    if (!event.target.files[0]) return
    setImage(event.target.files[0])
  }

  return (
    <form onSubmit={handleSubmit((data) => handlerSubmit(data))} className="p-4 space-y-4">
      {/* <!-- name Input --> */}
      <ReusableInput label="Product Name">
        <input
          type="text"
          placeholder="Product Name..."
          className="input input-bordered w-full"
          {...register('name')}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </ReusableInput>
      {/* <!-- name Input end --> */}

      {/* <!-- description Input --> */}
      <ReusableInput label="Product Name">
        <textarea
          placeholder="Product Name..."
          className="textarea input-bordered w-full h-24"
          {...register('description')}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </ReusableInput>
      { }

      {/* <!-- price Input --> */}
      <ReusableInput label="Price">
        <input
          type="number"
          className="input input-bordered w-full"
          {...register('price', {
            setValueAs: (value) => parseFloat(value)
          })}
        />
        {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
      </ReusableInput>
      {/* <!-- price Input end --> */}

      {
        //TODO: Add category select
      }
      {/* <!-- category Input --> */}
      <ReusableSelect label="Category">
        <select
          className="select select-bordered"
          {...register('category', {
            setValueAs: (value) => parseFloat(value)
          })}>
          <option></option>
          {categoryList.map((item) =>
            <option key={item.id} value={item.id} >{item.name}</option>
          )
          }
        </select>
        {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
      </ReusableSelect>

      {/* <ReusableInput label="Category number">
        <input
          type="number"
          className="input input-bordered w-full"
          {...register('category', {
            setValueAs: (value) => parseFloat(value)
          })}
        />
        {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
      </ReusableInput> */}
      {/* <!-- category Input end --> */}

      <label className="form-control w-full ">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered file-input-accent w-full max-w-xs"
          onChange={(e: any) => {
            imageUploadHandler(e)
            setHasImage(false)
          }}
        />
        <div className="label">
          <span className="label-text text-xs">
            {hasImage && <ErrorMessage>You should choose an image</ErrorMessage>}
          </span>
        </div>
      </label>

      {/* <!-- Login Button --> */}
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
