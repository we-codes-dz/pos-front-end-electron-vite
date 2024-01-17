import { cn } from "@renderer/utils/helper";

interface Props {
    btnClassName?: string;
    modalHandler: () => void;
}
const ModalBody =
    ({ modalHandler, btnClassName }: Props) => {
        return (
            <div className="font-medium text-lg">
                {/* if there is a button, it will close the modal */}
                Do you really want to delete ?
                <div className="modal-action">
                    <button className={cn(
                        "text-accent btn bg-neutral border-none",
                        btnClassName
                    )} onClick={modalHandler} >Cancel</button>
                    <button className={cn(
                        "text-white btn btn-primary",
                        btnClassName
                    )} onClick={modalHandler} >Confirm</button>
                </div>
            </div>
        )
    }

export default ModalBody