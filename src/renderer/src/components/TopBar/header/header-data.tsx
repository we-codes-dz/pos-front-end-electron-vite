import { THeaderItemIn } from "./header-item";
import { RiCustomerService2Line } from "react-icons/ri";

export const manageHeaderList: THeaderItemIn[] = [
    { id: 1, label: 'Home', icon: <RiCustomerService2Line />, href: "/work-space" },
    { id: 2, label: 'Table', icon: <RiCustomerService2Line />, href: "/work-space/table-management" },
    { id: 3, label: 'Product', icon: <RiCustomerService2Line />, href: "/work-space/products-management" },
    { id: 4, label: 'Category', icon: <RiCustomerService2Line />, href: "/work-space/categories-management" },
    { id: 5, label: 'Payment', icon: <RiCustomerService2Line />, href: "/work-space/sales-management" },
    { id: 5, label: 'Order', icon: <RiCustomerService2Line />, href: "/work-space/orders-management" },
    { id: 6, label: 'Analytics', icon: <RiCustomerService2Line />, href: "/work-space" },
]