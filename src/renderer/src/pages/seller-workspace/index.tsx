import Categories from "@renderer/components/Categories";
import Products from "@renderer/components/Products";
import NoteOrderModal from "@renderer/components/modal/work-space/note/note-modal";
import { useBoundStore } from "@renderer/stores/store";

const SellerWorkSpace = () => {

    const { addNoteToProduct, selectProductId, modalHandler, modalIsOpened } = useBoundStore((state) => state)



    const handleAddNoteButton = (data: { note: string }) => {
        addNoteToProduct(selectProductId, data.note)
        console.log('note :', data, 'product Selected : ', selectProductId)
    }

    return (
        <div className="bg-slate-200 w-screen px-4 flex h-[630px]">
            <div className='flex flex-col justify-center border-r-2 w-1/6 h-full'>
                <Categories />
            </div>
            <div className='border-r-2 w-5/6 h-[630px]'>
                <Products />
            </div>
            <NoteOrderModal handleAddNoteButton={(data) => handleAddNoteButton(data)} modalHandler={modalHandler} modalIsOpened={modalIsOpened} title='Add note' />
        </div>

    )
}

export default SellerWorkSpace