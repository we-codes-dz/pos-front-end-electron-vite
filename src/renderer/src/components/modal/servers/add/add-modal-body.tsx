import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import SpinnerComponent from '@renderer/components/Spinner/Spinner'
import ErrorMessage from '@renderer/components/inputs/ErrorMessage/ErrorMessage'
import ReusableInput from '@renderer/components/inputs/input/custom-input'
import { serverSchema } from '@renderer/types/form-schema'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Inputs = z.infer<typeof serverSchema>

interface Props {
  btnClassName?: string
  modalHandler: () => void
  setDataInputs: (data: any) => void
  handleAddButtonSubmit: () => void
}
const ModalBody = ({ modalHandler, setDataInputs, handleAddButtonSubmit }: Props) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  //? form control logic
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onSubmit',
    resolver: zodResolver(serverSchema)
  })

  //?
  const handlerSubmit = async (data: Inputs) => {
    try {

      setDataInputs(data)
      handleAddButtonSubmit()
      //? enabling the spinner
      setSubmitting(true)
      modalHandler()
      //? disenabling the spinner
      setSubmitting(false)
      reset()

    } catch (error) {
      console.log(error)
      modalHandler()
    }
  }


  return (
    <form onSubmit={handleSubmit((data) => handlerSubmit(data))} className="p-4 space-y-4">
      {/* <!-- name Input --> */}
      <ReusableInput label="Server Name">
        <input
          type="text"
          placeholder="Server Name..."
          className="input input-bordered w-full"
          {...register('fullName')}
        />
        {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
      </ReusableInput>


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
