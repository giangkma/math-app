import React, { FC, useEffect, useState } from 'react';
import { dataClassrooms } from 'src/utils/dummy';
import { Alert } from 'src/view/components/alert';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { Spinner } from 'src/view/components/loading/Spinner';
import { MenuBarBottom } from 'src/view/components/menu/MenuBarBottom';
import { useAuth } from 'src/view/hooks';
import { useMessageData } from 'src/view/hooks/message';
import { useRanks } from 'src/view/hooks/ranks';
import { Theme1 } from 'src/view/layout/components/Theme1';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { HeaderBack } from 'src/view/layout/HeaderBack';
import { Screen } from 'src/view/routes/Router';
import avatarDefault from 'src/assets/images/client_default.png';
import { getInitialName } from 'src/utils/stringUtils';

export const Ranks: FC = () => {
    const [classSelected, setClassSelected] = useState<string>('1');
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();
    const { data: ranks, isValidating, error } = useRanks(classSelected);
    const { user } = useAuth();

    useEffect(() => {
        if (error) setMessage(error.message);
    }, [error, setMessage]);

    return (
        <DefaultLayout title={`Bảng xếp hạng lớp ${classSelected}`}>
            <Theme1 />
            <div className="h-screen relative bg-black bg-opacity-50">
                <HeaderBack
                    title={`Bảng xếp hạng lớp ${classSelected}`}
                    to={Screen.Classrooms}
                />
                <Spinner className="rounded-xl" loading={isValidating} />
                <Alert
                    isSuccess={isSuccess}
                    message={message}
                    clearMessage={clearMessage}
                />
                <div className="sm:w-195 w-full sm:mx-auto sm:mt-12 overflow-y-auto pb-32 p-4">
                    <h1 className="p-2 sm:block hidden w-full text-left border-b border-white border-opacity-25 text-xl text-white">
                        Bảng xếp hạng
                    </h1>
                    <div className="p-3 flex items-center justify-between">
                        {dataClassrooms.map(classroom => {
                            return (
                                <PrimaryButton
                                    key={classroom.id}
                                    color={
                                        classSelected === classroom.nameClass
                                            ? 'green'
                                            : 'blue'
                                    }
                                    title={`Lớp ${classroom.nameClass}`}
                                    className="sm:px-3 px-2 py-1 text-sm"
                                    onClick={(): void =>
                                        setClassSelected(classroom.nameClass)
                                    }
                                />
                            );
                        })}
                    </div>
                    <div className=" pb-20 sm:text-xl text-base mx-2">
                        <div className="flex items-center  justify-between text-center text-white mb-2">
                            <p className="flex-1">STT</p>
                            <p className="flex-1"></p>
                            <p className="flex-3">Tên</p>
                            <p className="flex-1">Điểm</p>
                        </div>
                        <div className="overflow-y-auto h-screen">
                            {ranks && !!ranks.length ? (
                                ranks.map((item, index) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className={`flex items-center justify-between text-center text-white mb-1 text-base  py-2 rounded-lg ${item.id ===
                                                user?.id && 'bg-dodgerBlue'}`}
                                        >
                                            <p className="flex-1">
                                                {index + 1}
                                            </p>
                                            <div className="flex-1">
                                                {item.avatar ? (
                                                    <img
                                                        className="w-10 h-10 rounded-full"
                                                        src={
                                                            item.avatar
                                                                ? item.avatar
                                                                : avatarDefault
                                                        }
                                                        alt=""
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-black ">
                                                        {item &&
                                                            getInitialName(
                                                                item,
                                                            )}
                                                    </div>
                                                )}
                                            </div>
                                            <p className="flex-3">
                                                {item.name}
                                                {item.id === user?.id && (
                                                    <span className="text-xs">
                                                        &nbsp;(bạn)
                                                    </span>
                                                )}
                                            </p>
                                            <p className="flex-1">
                                                {item.score}
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="z-10 text-center text-white mt-4 sm:text-xl text-base">
                                    Chưa có dữ liệu ...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <MenuBarBottom />
            </div>
        </DefaultLayout>
    );
};
