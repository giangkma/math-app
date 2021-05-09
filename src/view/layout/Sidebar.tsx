import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { UserThunks } from 'src/state/thunks';
import { AppModal } from '../components/modal/AppModal';

type IProps = {
    isOpenSidebar: boolean;
    onToggleSidebar: () => void;
    onCloseSidebar: () => void;
};

export const Sidebar: FC<IProps> = ({
    onCloseSidebar,
    isOpenSidebar,
    onToggleSidebar,
}) => {
    const dispatch = useDispatch();

    const onLogout = (): void => {
        dispatch(UserThunks.onLogoutThunk());
    };

    return (
        <AppModal clickOutside={onCloseSidebar}>
            <div
                className={`sidebar w-56 z-50 transition transform duration-300 h-full fixed top-0 right-0 ${!isOpenSidebar &&
                    'translate-x-56'}`}
            >
                <div className="w-full">
                    <button
                        className="text-5xl ml-4 -mt-2 outline-none focus:outline-none text-opacity-75 hover:text-opacity-100 text-white transform rotate-45"
                        type="button"
                        onClick={onToggleSidebar}
                    >
                        +
                    </button>
                </div>
                <div className="w-full mt-4 flex items-center justify-center">
                    <button
                        type="button"
                        onClick={onLogout}
                        className="outline-none focus:outline-none border-1.6px border-lightPeach rounded-full text-white px-8 py-2 hover:bg-white hover:text-gray-800 transition duration-200"
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </AppModal>
    );
};
