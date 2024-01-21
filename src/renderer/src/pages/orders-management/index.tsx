import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import useSales from "@renderer/api/hooks/useSales";
import SalesTable from "@renderer/components/table/sales/sale-table";
import OrderTabs, { TOrderTabs } from "@renderer/components/tabs/orders/order-tabs";
import useAxiosPrivate from "@renderer/hooks/useAxiosPrivate";
import { TProductColumn } from "@renderer/types/type-schema";



const columnHeaders: TProductColumn[] = [
    {
        key: "table",
        label: "Table"
    },
    {
        key: "total",
        label: "Total"
    },
    {
        key: "createdAt",
        label: "Date"
    },
    {
        key: "action",
        label: "Actions"
    }
];
const OrdersPage = () => {

    const axiosInstance = useAxiosPrivate();
    const { data: sales, isLoading } = useSales(axiosInstance);

    if (isLoading) return null
    console.log(sales)

    const structuringData =
        (sales: any) => {
            return sales.data.data;
        }
    const structuredSales = structuringData(sales)
    console.log(structuredSales)

    const tabData: TOrderTabs[] = [
        {
            key: 'eat-in',
            title: "Eat in",
            content: <> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</>
        },
        {
            key: 'eat-out',
            title: "Eat out",
            content: <> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</>

        },

    ]
    return (
        <div className="flex flex-col w-full overflow-y-scroll h-full">
            <OrderTabs data={tabData} />
            {/* <SalesTable
                headers={columnHeaders}
                sales={structuredSales}
            /> */}
        </div>
    )
}

export default OrdersPage