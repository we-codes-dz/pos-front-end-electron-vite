import { useBoundStore } from "@renderer/stores/store"
import ClearAllButton from "./buttons/clear-all-button"
import AddsOnOrNoteButton from "./buttons/adds-on-button"
import { shallow } from 'zustand/shallow'

const OrderItemButtonSection = () => {
    const [
        selectProductId,
        isItemChosen,
        clearCurrentOrder,
        noteModalHandler,
        adsOnModalHandler
    ] = useBoundStore((state) => [
        state.selectProductId,
        state.isItemChosen,
        state.clearCurrentOrder,
        state.noteModalHandler,
        state.adsOnModalHandler
    ], shallow)

    const removeItems = () => {
        clearCurrentOrder()
    }
    return (
        <div className="">
            <span className="text-sm font-semibold">Order item actions</span>
            <div className="space-x-2 font-semibold self-end ">
                <ClearAllButton onClick={removeItems}>
                    Clear All
                </ClearAllButton>
                <AddsOnOrNoteButton isItemChosen={isItemChosen} onClick={adsOnModalHandler} selectProductId={selectProductId}>
                    Adds On
                </AddsOnOrNoteButton>
                <AddsOnOrNoteButton isItemChosen={isItemChosen} onClick={noteModalHandler} selectProductId={selectProductId}>
                    Note
                </AddsOnOrNoteButton>
            </div>
        </div>
    )
}

export default OrderItemButtonSection