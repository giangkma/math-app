import React, { FC } from 'react';
import { APP_CONFIG } from 'src/config';
import { AppDropdown } from 'src/view/components/dropdown/AppDropdown';

type IProps = {
    onSelect: (size: number) => void;
    pageSize: number;
};

export const DropdownPageSize: FC<IProps> = ({ onSelect, pageSize }) => {
    return (
        <AppDropdown classNameContainer="w-full" title={pageSize.toString()}>
            {APP_CONFIG.PAGE_SIZE.map(size => {
                return (
                    <button
                        key={size}
                        onClick={(): void => onSelect(size)}
                        className="text-black text-center py-2 w-full leading-5  hover:underline"
                    >
                        {size}
                    </button>
                );
            })}
        </AppDropdown>
    );
};
