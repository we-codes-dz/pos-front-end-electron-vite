import { RxCross2 } from "react-icons/rx";
import { GrCircleAlert } from "react-icons/gr";
import AlertComponent from "@renderer/components/Alert";

type TErrorHeaderProps = {
    error: string | null;
    setError: (el: any) => void
}
const ErrorHeader =
    ({ error, setError }: TErrorHeaderProps) => {
        return (
            <>
                {error && <AlertComponent variant="danger" className="flex items-center mb-2">
                    {({ dismiss }) => (
                        <>
                            <GrCircleAlert className="w-6 h-6 mr-2" />{" "}
                            {error}
                            <AlertComponent.DismissButton
                                type="button"
                                className="text-white"
                                aria-label="Close"
                                onClick={() => {
                                    setError(null)
                                    dismiss();
                                }}
                            >
                                <RxCross2 className="h-4 w-4" />
                            </AlertComponent.DismissButton>
                        </>
                    )}
                </AlertComponent>}
            </>
        )
    }

export default ErrorHeader