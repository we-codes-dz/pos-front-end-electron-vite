import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { ReactNode } from "react";

export type TOrderTabs = {
    key: string;
    title: string;
    content: ReactNode;
}
type TProps = {
    data: TOrderTabs[]
}
const OrderTabs =
    ({ data }: TProps) => {
        return (
            <Tabs color="warning">
                {data.map((item) =>
                    <Tab key={item.key} title={item.title}>
                        <Card>
                            <CardBody>
                                {item.content}
                            </CardBody>
                        </Card>
                    </Tab>
                )
                }
            </Tabs>
        )
    }

export default OrderTabs