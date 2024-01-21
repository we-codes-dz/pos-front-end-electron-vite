import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { ReactNode } from "react";

export type TOrderTabs = {
    key: string;
    title: string;
    content: ReactNode;
}
type TProps = {
    eatInTable: ReactNode;
    eatOutTable: ReactNode;
}
const OrderTabs =
    ({ eatInTable, eatOutTable }: TProps) => {
        return (
            <Tabs color="warning">
                <Tab key="eat-in" title="Eat in">
                    <Card>
                        <CardBody>
                            {eatInTable}
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="eat-out" title="Eat out">
                    <Card>
                        <CardBody>
                            {eatOutTable}
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        )
    }

export default OrderTabs