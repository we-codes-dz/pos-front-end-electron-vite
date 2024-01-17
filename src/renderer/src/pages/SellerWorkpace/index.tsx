import Categories from "@renderer/components/Categories"
import Products from "@renderer/components/Products"

const SellerWorkSpace = () => {
    return (
        <div className="bg-slate-200 w-screen px-4 flex h-[630px]">
            <div className='flex flex-col justify-center border-r-2 w-1/6 h-full'>
                <Categories />
            </div>
            <div className='border-r-2 w-5/6 h-[630px]'>
                <Products />
            </div>
        </div>

    )
}

export default SellerWorkSpace