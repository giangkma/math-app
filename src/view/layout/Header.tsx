import React, { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarIconSVG, HandIconSVG } from 'src/assets/svg';
import { AppModal } from '../components/modal/AppModal';
import { useAuth } from '../hooks';
import { Sidebar } from './Sidebar';

type IProps = {
    activeButton?: number;
};

export const Header: FC<IProps> = ({ activeButton = 1 }) => {
    // const isClientPage = useRouteMatch(Screen.MyClients);
    const { user } = useAuth();

    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    const onToggleSidebar = (): void => {
        setIsOpenSidebar(prev => !prev);
    };

    const onCloseSidebar = useCallback((): void => {
        setIsOpenSidebar(false);
    }, []);

    return (
        <div className="flex item-header justify-between p-5 lg:p-10 border-b-2 border-nobelGray border-opacity-25">
            <Link to="/">
                <h1 className="md:text-4xl sm:text-3xl text-2xl text-white font-bold">
                    Math Example
                </h1>
            </Link>
            <div className="flex items-center">
                <button
                    className="outline-none focus:outline-none text-white border-b-3px px-4 transition duration-300 py-1 ss:flex hidden border-1.6px border-primaryColor rounded-full xs:mr-8 mr-4  items-center"
                    type="button"
                >
                    <HandIconSVG />
                    <span>&nbsp;Xin chào</span>
                    <span className="text-lg xs:block hidden">
                        &nbsp;{user?.name}&nbsp;
                    </span>
                    !
                </button>
                <button
                    className="outline-none focus:outline-none"
                    type="button"
                    onClick={onToggleSidebar}
                >
                    <BarIconSVG className="md:w-12 md:h-12 xs:w-10 xs:h-10 h-8 w-8" />
                </button>
                <AppModal clickOutside={onCloseSidebar}>
                    <Sidebar
                        isOpenSidebar={isOpenSidebar}
                        onToggleSidebar={onToggleSidebar}
                    />
                </AppModal>
            </div>
        </div>
    );
};
