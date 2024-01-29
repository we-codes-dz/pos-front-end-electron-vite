import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import useCategories from '@renderer/api/hooks/useCategories'
import SpinnerComponent from '@renderer/components/Spinner/Spinner'
import ErrorMessage from '@renderer/components/inputs/ErrorMessage/ErrorMessage'
import ReusableInput from '@renderer/components/inputs/input/custom-input'
import ReusableSelect from '@renderer/components/inputs/select/custom-select'
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate'
import { categorySchema } from '@renderer/types/form-schema'
import { TCategory } from '@renderer/types/type-schema'
import { getSafeCategoryList } from '@renderer/utils/helper'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Inputs = z.infer<typeof categorySchema>



interface Props {
  btnClassName?: string
  modalHandler: () => void
  data?: TCategory
  onClickHandler: (data: any, avatar: any) => void
}

const ModalBody = ({ modalHandler, onClickHandler, data }: Props) => {
  const [image, setImage] = useState<any>([])
  const [isSubmitting, setSubmitting] = useState<boolean>(false)

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
      const { name, parent } = data
      setValue('name', name)
      if (parent) setValue('parent', parent?.id.toString())
    }
  }, [data, setValue])
  //?
  const handlerSubmit = async (data: Inputs) => {
    try {
      onClickHandler(data, image)
      //? enabling the spinner
      setSubmitting(true)
      //? resetting the form after action
      reset()
      //? closing the modal
      modalHandler()
      //? adding api logic

      //? disenabling the spinner
      setSubmitting(false)
    } catch (error) {
      console.log(error)
      modalHandler()
    }
  }

  if (!data) return null
  return (
    <form onSubmit={handleSubmit((data) => handlerSubmit(data))} className="p-4 space-y-3">
      {/* <!-- name Input  start--> */}
      <ReusableInput label="Category Name">
        <input
          type="text"
          placeholder="Category Name..."
          className="input input-bordered w-full"
          {...register('name')}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </ReusableInput>
      {/* <!-- name Input end --> */}

      <ReusableSelect label="Category">
        <select
          {...register('parent')}
          className="select select-bordered"
        >
          <option></option>
          {categoryList.map((item) =>
            <option key={item.id} value={item.id} >{item.name}</option>
          )
          }
        </select>
      </ReusableSelect>

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
