import React, { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { HandIconSVG, HomeActiveIconSVG } from 'src/assets/svg';
import { UserRole } from 'src/domain/user';
import { getLastName } from 'src/utils/stringUtils';
import { AppModal } from '../components/modal/AppModal';
import { useAuth } from '../hooks';
import { useRoleUserAuthenticated } from '../hooks/role';
import { Screen } from '../routes/Router';
import { Notification } from './components/Notification';
import avatarDefault from 'src/assets/images/client_default.png';

type IProps = {};

export const Header: FC<IProps> = () => {
    const isTeacher = useRoleUserAuthenticated(UserRole.teacher);
    const [isShowModalProfile, setIsShowModalProfile] = useState<boolean>(
        false,
    );
    const onToggleModalProfile = (): void => {
        setIsShowModalProfile(prev => !prev);
    };

    const onCloseModalProfile = useCallback((): void => {
        setIsShowModalProfile(false);
    }, []);

    const { user, onLogout } = useAuth();

    return (
        <>
            <div className="flex item-header relative items-center w-full justify-between p-4 border-b-2 border-nobelGray border-opacity-25">
                <div className="sm:block hidden">
                    <Link to={Screen.Classrooms}>
                        <div className="col-span-3 flex items-center justify-center flex-col">
                            <HomeActiveIconSVG className="w-10 h-10" />
                            <div
                                className={`text-base leading-14px text-white`}
                            >
                                Học
                            </div>
                        </div>
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
                            &nbsp;{user && getLastName(user)}&nbsp;
                        </span>
                        !
                    </button>
                    <div className="flex gap-2">
                        {isTeacher && <Notification />}
                        <div className="relative">
                            <AppModal clickOutside={onCloseModalProfile}>
                                <button
                                    className={`outline-none hover:bg-starkWhite hover:text-woodyBrown focus:outline-none rounded-full bg-black text-white flex items-center justify-center`}
                                    type="button"
                                    onClick={onToggleModalProfile}
                                >
                                    <img
                                        src={
                                            user && user.avatar
                                                ? user.avatar
                                                : avatarDefault
                                        }
                                        alt=""
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                    />
                                </button>
                                {isShowModalProfile && (
                                    <div className="absolute z-50 bg-gray-800 bg-opacity-75 text-white lg:w-75 md:w-56 w-56 rounded-2xl right-0 mt-3 p-5">
                                        <p className="lg:text-xl text-base">
                                            {user?.name}
                                        </p>
                                        <div className="flex flex-wrap gap-2 items-center justify-between mt-4">
                                            <Link to={Screen.Account}>
                                                <div className="px-2 md:block hidden py-1 cursor-pointer border-white rounded-full border-1.6px hover:bg-white hover:bg-opacity-25 transition duration-200">
                                                    Thông tin cá nhân
                                                </div>
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={onLogout}
                                                className="outline-none focus:outline-none px-2 py-1 cursor-pointer border-white rounded-full border-1.6px hover:bg-white hover:bg-opacity-25 transition duration-200"
                                            >
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </AppModal>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
