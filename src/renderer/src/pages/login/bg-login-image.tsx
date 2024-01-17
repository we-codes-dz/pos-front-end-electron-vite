type TProps = {
    src: string;
}
const BgLoginImage =
    ({ src }: TProps) => {
        return (
            <div className="w-1/2 h-screen hidden lg:block">
                <img src={src} alt="Placeholder Image" className="object-cover w-full h-full" />
            </div>
        )
    }

export default BgLoginImage