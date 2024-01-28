import { supplies } from "./data"
import SupplyItem from "./supply-item"

const index = () => {
    return (
        <div className="flex flex-wrap gap-4">

            {supplies.map((item) => (
                <SupplyItem key={item.name} item={item} />
            ))}

        </div>
    )
}

export default index