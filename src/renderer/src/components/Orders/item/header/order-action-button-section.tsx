import { cn } from "@renderer/utils/helper";
import { MdTableRestaurant } from "react-icons/md";
import { RiTakeawayLine } from "react-icons/ri";
import TakeInOutButton from "./buttons/take-in-out-button";

const buttonData = [
    { title: 'Take out', icon: <MdTableRestaurant />, style: 'btn-success' }
]
const OrderActionButtonSection = () => {
    return (
        <div>
            <span className="text-sm font-semibold">Customer decision</span>
            <div className="flex justify-between  font-semibold self-end gap-2">
                <TakeInOutButton className="btn-primary" title="Take in">
                    <MdTableRestaurant />
                </TakeInOutButton>
                <TakeInOutButton className="btn-secondary" title="Takeaway meal">
                    <RiTakeawayLine />
                </TakeInOutButton>
                <TakeInOutButton className="btn-success" title="Take out">
                    <RiTakeawayLine />
                </TakeInOutButton>
            </div>
        </div>
    )
}

export default OrderActionButtonSection