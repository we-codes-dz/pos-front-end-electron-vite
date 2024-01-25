type TProps = {
    content: string
}
const NoData =
    ({ content }: TProps) => {
        return (
            <div className='flex w-full h-full justify-center items-center'>
                <div className="flex w-full justify-center font-bold text-xl ">
                    {content}
                </div>
            </div>
        )
    }

export default NoData