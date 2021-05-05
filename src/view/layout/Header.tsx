import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarIconSVG, HandIconSVG } from 'src/assets/svg';
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

    return (
        <div className="flex item-header justify-between p-5 lg:p-10 border-b-2 border-nobelGray border-opacity-25">
            <Link to="/">
                <h1 className="text-4xl text-white font-bold">Math Example</h1>
            </Link>
            <div className="hidden sm:block"></div>
            <div className="flex items-center">
                <button
                    className="outline-none focus:outline-none text-white border-b-3px px-4 transition duration-300 py-1 border-1.6px border-primaryColor rounded-full mr-8 flex items-center"
                    type="button"
                >
                    <HandIconSVG />
                    <span>&nbsp;Xin chào</span>
                    <span className="text-lg">&nbsp;{user?.name}&nbsp;</span>!
                </button>
                <button
                    className="outline-none focus:outline-none"
                    type="button"
                    onClick={onToggleSidebar}
                >
                    <BarIconSVG />
                </button>
            </div>
            <Sidebar
                isOpenSidebar={isOpenSidebar}
                onToggleSidebar={onToggleSidebar}
            />
        </div>
    );
};
