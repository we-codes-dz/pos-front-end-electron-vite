import { cn } from "@renderer/utils/helper";
import ModalTitle from "./modal-title";
import { ReactNode } from "react";

interface Props {
    className?: string;
    btnClassName?: string;
    title?: string;
    modalIsOpened: boolean;
    modalHandler: () => void;
    children: ReactNode;
    maxWidth?: "max-w-xs" | "max-w-sm" | "max-w-md" | "max-w-lg";
}

const ModalWrapper =
    ({ title, className, modalIsOpened, children, maxWidth }: Props) => {
        return (
            <dialog id="my_modal_4"
                className={cn(
                    "modal",
                    { "modal-open": modalIsOpened }
                )
                }
            >
                <div className={cn(
                    "modal-box max-w-sm bg-white",
                    className,
                    maxWidth
                )}>
                    {title && <ModalTitle title={title} />}
                    {children}

                </div>
            </dialog>
        )
    }

export default ModalWrapper