import { cn } from "@renderer/utils/helper";

interface Props {
    btnClassName?: string;
    modalHandler: () => void;
    data: any;
}
const ModalBody =
    ({ modalHandler, btnClassName, data }: Props) => {
        console.log(data)
        return (
            <div className=" ">
                {/* if there is a button, it will close the modal */}

                <div className="stat">
                    <div className="stat-title">Total</div>
                    <div className="stat-value">{data.total} {" DA"}</div>
                    <div className="space-y-2 pt-2">
                        {data.items.map((item) => (
                            <div key={item.id} className="stat-desc flex justify-between">
                                <span>Price</span>
                                <span>{item?.price}</span>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className="modal-action">
                    <button className={cn(
                        "text-accent btn bg-neutral border-none",
                        btnClassName
                    )} onClick={modalHandler} >Close</button>

                </div>
            </div>
        )
    }

export default ModalBody