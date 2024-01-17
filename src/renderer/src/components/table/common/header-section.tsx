import { ChangeEvent } from 'react';
import Header from './header';
import { Select, SelectItem } from '@nextui-org/react';
type Props = {
    filterOptions: { label: string, value: string }[];
    handleFilterParamChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onClick: () => void;
    title?: string;
}
const HeaderSection =
    ({ handleFilterParamChange, filterOptions, onClick, title }: Props) => {
        return (
            <div className="flex justify-between items-center w-full ">
                <Header title={title ? title : 'Table'} />
                <div className=" flex gap-2 justify-end items-center">
                    <div
                        className="btn btn-info text-white text-xl"
                        onClick={onClick}
                    >+</div>
                    <Select
                        label="Filterer"
                        className=" text-black w-32"
                        placeholder="Selectionner un filter"
                        onChange={(e) => handleFilterParamChange(e)}
                    >
                        {filterOptions.map((item) => (
                            <SelectItem className="text-black" key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
        );
    }

export default HeaderSection;