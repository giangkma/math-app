import React, { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarIconSVG, HandIconSVG } from 'src/assets/svg';
import { UserRole } from 'src/domain/user';
import { getLastName } from 'src/utils/stringUtils';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { useAuth } from '../hooks';
import { useRoleUserAuthenticated } from '../hooks/role';
import { Screen } from '../routes/Router';
import { Notification } from './components/Notification';
import { Sidebar } from './Sidebar';

type IProps = {};

export const Header: FC<IProps> = () => {
    const isTeacher = useRoleUserAuthenticated(UserRole.teacher);

    const { user } = useAuth();

    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    const onToggleSidebar = (): void => {
        setIsOpenSidebar(prev => !prev);
    };

    const onCloseSidebar = useCallback((): void => {
        setIsOpenSidebar(false);
    }, []);

    return (
        <>
            <div className="flex item-header absolute items-center w-full justify-between p-4 sm:p-5 lg:p-6 border-b-2 border-nobelGray border-opacity-25">
                <div className="sm:block hidden">
                    <Link to={Screen.Classrooms}>
                        <h1 className="md:text-4xl sm:text-3xl text-2xl text-white font-bold">
                            Math Example
                        </h1>
                    </Link>
                </div>
                <div className="sm:justify-end justify-between flex gap-2 sm:w-1/2 w-full relative">
                    <button
                        className="outline-none focus:outline-none text-white border-b-3px px-4 transition duration-300 mr-2 py-1 flex border-1.6px border-primaryColor rounded-full  items-center"
                        type="button"
                    >
                        <HandIconSVG />
                        <span>&nbsp;Xin chào</span>
                        <span className="text-lg">
                            &nbsp;{getLastName(user)}&nbsp;
                        </span>
                        !
                    </button>
                    <div className="flex gap-2">
                        {isTeacher && <Notification />}
                        <button
                            className="outline-none focus:outline-none hover:bg-white hover:bg-opacity-25 transition duration-300 rounded-full flex items-center justify-center p-1"
                            type="button"
                            onClick={onToggleSidebar}
                        >
                            <BarIconSVG className="md:w-12 md:h-12 xs:w-10 xs:h-10 h-8 w-8" />
                        </button>
                    </div>
                </div>
            </div>
            <Sidebar
                isOpenSidebar={isOpenSidebar}
                onToggleSidebar={onToggleSidebar}
                onCloseSidebar={onCloseSidebar}
            />
        </>
    );
};
