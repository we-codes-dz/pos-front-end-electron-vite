import { cn } from '@renderer/utils/helper';
import { Th, Thead, Tr } from '..';


export interface ColumnHeaderInt {
    key: string;
    label: string;
}

type TProps = {
    headers: ColumnHeaderInt[];
}

const TableHeader =
    ({ headers }: TProps) => {
        return (
            <Thead>
                <Tr>
                    {headers.map((item) => (
                        <Th key={item.key} className={cn(
                            { "text-center": item.label === 'actions' },
                            "border-b-0 whitespace-nowrap"
                        )}>
                            {item.label}
                        </Th>
                    ))
                    }
                </Tr>
            </Thead>
        )
    }

export default TableHeader