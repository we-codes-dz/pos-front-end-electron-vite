type TProps = {
    onClick: () => void
}
const DeleteItemButton =
    ({ onClick }: TProps) => {
        return (
            <div className="absolute top-1 right-1">
                <div
                    className="flex  rounded-full btn-sm btn btn-circle text-white bg-red-500"
                    onClick={onClick}
                >
                    <span className='text-lg pb-1.5'>
                        x
                    </span>
                </div>
            </div>
        )
    }

export default DeleteItemButton