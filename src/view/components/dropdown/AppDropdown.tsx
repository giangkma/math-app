import React, { FC, useCallback, useState } from 'react';
import { ArrowDownIconSVG, ArrowUpWhiteIconSVG } from 'src/assets/svg';
import { AppModal } from '../modal/AppModal';
import styles from './dropdown.module.css';

type IProps = {
    title: string;
    titleActive?: string;
    classNameContainer?: string;
};
export const AppDropdown: FC<IProps> = ({
    title,
    titleActive,
    children,
    classNameContainer = 'w-32',
}) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

    const toggleDropdown = (): void => {
        setIsOpenDropdown(prev => !prev);
    };

    const onCloseDropdown = useCallback((): void => {
        setIsOpenDropdown(false);
    }, []);

    return (
        <div
            className={` relative inline-block text-left ${classNameContainer}`}
        >
            <AppModal clickOutside={onCloseDropdown}>
                <button
                    className={`inline-flex justify-between w-full px-5 py-2 sm:text-lg text-base transition duration-300 ease-in-out outline-none focus:outline-none rounded-full items-center border-woodyBrown border-1.6px hover:bg-woodyBrown group ${styles.dropdown}`}
                    type="button"
                    onClick={toggleDropdown}
                >
                    <p className="group-hover:text-white mr-4">
                        {titleActive ? (
                            isOpenDropdown ? (
                                title
                            ) : (
                                <>
                                    <span className="group-hover:hidden block">
                                        {title}
                                    </span>
                                    <span className="group-hover:block hidden">
                                        {titleActive}
                                    </span>
                                </>
                            )
                        ) : (
                            title
                        )}
                    </p>
                    {isOpenDropdown ? (
                        <ArrowUpWhiteIconSVG className="w-4 h-4" />
                    ) : (
                        <ArrowDownIconSVG className="transform w-4 h-4 transition duration-300 group-hover:rotate-180 " />
                    )}
                </button>
            </AppModal>
            <div
                className={`${
                    isOpenDropdown
                        ? 'opacity-1 visible scale-100'
                        : 'opacity-0 invisible scale-90'
                } transition-all duration-300 transform w-full `}
            >
                <div className="absolute right-0 mt-2 border-1.6px border-woodyBrown bg-white rounded-2xl shadow-lg outline-none w-full ml-4">
                    <div className="py-1">{children}</div>
                </div>
            </div>
        </div>
    );
};
