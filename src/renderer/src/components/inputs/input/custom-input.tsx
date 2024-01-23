import { ReactNode } from "react";

type InputProps = {
    label: string;
    children: ReactNode;
}
const ReusableInput =
    ({ label, children }: InputProps) => {
        return (
            <label className="form-control w-full ">
                <div className="label">
                    <span className="label-text text-xs">{label}</span>
                </div>
                {children}
            </label>
        );
    };

export default ReusableInput;
