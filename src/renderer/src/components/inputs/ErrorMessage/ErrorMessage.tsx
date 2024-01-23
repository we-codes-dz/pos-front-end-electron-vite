import { PropsWithChildren } from "react"

const ErrorMessage =
    ({ children }: PropsWithChildren) => {

        if (!children) return null;

        return (
            <div className='label  text-xs'>
                <span className="label-text-alt text-danger">{children}</span>
            </div>
        )
    }

export default ErrorMessage