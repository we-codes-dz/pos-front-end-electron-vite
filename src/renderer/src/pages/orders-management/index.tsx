import useSales from "@renderer/api/hooks/useSales";
import OrdersTable from "@renderer/components/table/orders/order-table";
import OrderTabs from "@renderer/components/tabs/orders/order-tabs";
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
    const { data: orders, isLoading } = useSales(axiosInstance);

    if (isLoading) return null

    if (!isLoading && !orders) return <>no data</>
    const structuringData =
        (orders: any) => {
            return orders.data.data;
        }
    const structuredOrders = structuringData(orders)


    return (
        <div className="flex flex-col w-full overflow-y-scroll h-full">
            {structuredOrders &&
                <OrderTabs
                    eatInTable={<OrdersTable headers={columnHeaders} orders={structuredOrders} />}
                    eatOutTable={<OrdersTable headers={columnHeaders} orders={structuredOrders} />}
                />}
        </div>
    )
}

export default OrdersPage