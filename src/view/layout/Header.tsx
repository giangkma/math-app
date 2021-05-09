import React, { FC, useCallback, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ArrowBackIconSVG, BarIconSVG, HandIconSVG } from 'src/assets/svg';
import { getLastName } from 'src/utils/stringUtils';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { AppModal } from '../components/modal/AppModal';
import { useAuth } from '../hooks';
import { Screen } from '../routes/Router';
import { Sidebar } from './Sidebar';

type IProps = {};

export const Header: FC<IProps> = () => {
    const isQuestionsPage = useRouteMatch(Screen.AddQuestion);
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
            <div className="flex item-header items-center w-full justify-between p-4 sm:p-5 lg:p-10 border-b-2 border-nobelGray border-opacity-25">
                <div className="sm:block hidden">
                    <Link to={Screen.Classrooms}>
                        <h1 className="md:text-4xl sm:text-3xl text-2xl text-white font-bold">
                            Math Example
                        </h1>
                    </Link>
                </div>
                {isQuestionsPage && (
                    <Link to={Screen.Classrooms}>
                        <ArrowBackIconSVG className="sm:hidden block w-8 h-8" />
                    </Link>
                )}
                <div
                    className={`${
                        isQuestionsPage
                            ? 'justify-end'
                            : 'sm:justify-end justify-between'
                    } flex sm:w-1/2 w-full`}
                >
                    <PrimaryButton
                        color="green"
                        className="md:block hidden px-6 text-lg py-2 mr-8"
                        title="Thêm câu hỏi"
                    />
                    <button
                        className="outline-none focus:outline-none text-white border-b-3px px-4 transition duration-300 py-1 flex border-1.6px border-primaryColor rounded-full xs:mr-8 mr-4  items-center"
                        type="button"
                    >
                        <HandIconSVG />
                        <span>&nbsp;Xin chào</span>
                        <span className="text-lg">
                            &nbsp;{getLastName(user)}&nbsp;
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
