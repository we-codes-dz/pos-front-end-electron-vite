import { cn } from "@nextui-org/react";
import ModalTitle from "./modal-title";
import { ReactNode } from "react";

interface Props {
    className?: string;
    btnClassName?: string;
    title?: string;
    modalIsOpened: boolean;
    modalHandler: () => void;
    onClickHandler: () => void;
    children: ReactNode;
    maxWidth?: "max-w-xs" | "max-w-sm" | "max-w-md" | "max-w-lg";
}

const CreateModalWrapper =
    ({ title, className, modalIsOpened, modalHandler, onClickHandler, children, maxWidth, btnClassName }: Props) => {
        return (
            <dialog id="my_modal_4"
                className={cn(
                    "modal",
                    { "modal-open": modalIsOpened }
                )
                }
            >
                <div className={cn(
                    "modal-box max-w-xl bg-white",
                    className,
                    maxWidth
                )}>
                    {title && <ModalTitle title={title} />}
                    {children}

                </div>
            </dialog>
        )
    }

export default CreateModalWrapper