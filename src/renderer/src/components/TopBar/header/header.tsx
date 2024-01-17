import { cn } from "@renderer/utils/helper";
import { manageHeaderList } from "./header-data";
import HeaderItem from "./header-item";

type TProps = {
    className?: string;
}

const TopBarHeader =
    ({ className }: TProps) => {
        return (
            <div className={cn(
                "flex flex-row gap-4 items-center px-5 mt-5 overflow-x-scroll border-b-2 pb-3", className
            )}>
                {manageHeaderList.map((manage) =>
                    <HeaderItem key={manage.id} item={manage} />
                )}
            </div>
        )
    }

export default TopBarHeader