import { BsDatabaseExclamation } from "react-icons/bs";

type TProps = {
    content: string
}
const NoData =
    ({ content }: TProps) => {
        return (
            <div className='flex w-full h-full justify-center items-center text-primary'>
                <div className="flex flex-col gap-2 items-center  w-full justify-center font-bold text-xl ">
                    <BsDatabaseExclamation className="h-12 w-12" />
                    {content}
                </div>
            </div>
        )
    }

export default NoData