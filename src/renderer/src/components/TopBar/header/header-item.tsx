import { Link } from "react-router-dom";

export type TPath = '/' | '*' | '/work-space' |
    '/work-space/categories-management' |
    '/work-space/products-management' |
    '/work-space/tables-management' |
    '/work-space/orders-management' |
    '/work-space/sales-management' |
    '/work-space/servers-management';

export type THeaderItemIn = {
    id: number;
    label: string;
    icon: React.ReactNode;
    href: TPath
}
interface Props {
    item: THeaderItemIn;
}
const HeaderItem = ({ item }: Props) => {
    return (
        <Link
            to={item.href}
            key={item.id}
            className="border rounded p-2 flex gap-2 justify-center items-center bg-white shadow-md text-black"
        >
            <span>{item.icon}</span>
            <span>{item.label}</span>
            { /* 
            *?  modal do do management
            <ProductModal title={item.label} modalHandler={modalHandler} modalIsOpened={modalIsOpened} />*/
            }
        </Link>
    )
}

export default HeaderItem