import React, { FC, useEffect, useState } from 'react';
import { dataClassrooms } from 'src/utils/dummy';
import { Alert } from 'src/view/components/alert';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { CommingSoon } from 'src/view/components/CommingSoon';
import { Spinner } from 'src/view/components/loading/Spinner';
import { MenuBarBottom } from 'src/view/components/menu/MenuBarBottom';
import { useAuth } from 'src/view/hooks';
import { useMessageData } from 'src/view/hooks/message';
import { useRanks } from 'src/view/hooks/ranks';
import { Theme1 } from 'src/view/layout/components/Theme1';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { Header } from 'src/view/layout/Header';

export const Ranks: FC = () => {
    const [classSelected, setClassSelected] = useState<string>('1');
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();
    const { data: ranks, isValidating, error } = useRanks(classSelected);

    const { user } = useAuth();

    useEffect(() => {
        if (error) setMessage(error.message);
    }, [error, setMessage]);

    return (
        <DefaultLayout>
            <Theme1 />
            <div className="h-screen relative overflow-auto bg-black bg-opacity-50">
                <Header />
                <Spinner className="rounded-xl" loading={isValidating} />
                <Alert
                    isSuccess={isSuccess}
                    message={message}
                    clearMessage={clearMessage}
                />
                <div className="w-full h-full p-4">
                    <h1 className="p-2 pl-4 w-full text-left border-b border-white border-opacity-25 text-xl text-white">
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
                                    className="px-4 py-1 text-sm"
                                    onClick={(): void =>
                                        setClassSelected(classroom.nameClass)
                                    }
                                />
                            );
                        })}
                    </div>
                    <div className="overflow-y-auto h-120  mx-2">
                        <div className="grid grid-cols-5 text-center text-white mb-2">
                            <p className="col-span-1">STT</p>
                            <p className="col-span-3">Tên</p>
                            <p className="col-span-1">Điểm</p>
                        </div>
                        {ranks &&
                            ranks.map((item, index) => {
                                return (
                                    <div
                                        key={item._id}
                                        className={`grid grid-cols-5 text-center text-white mb-1 text-base  py-2 rounded-lg ${item._id ===
                                            user?._id && 'bg-dodgerBlue'}`}
                                    >
                                        <p className="col-span-1">
                                            {index + 1}
                                        </p>
                                        <p className="col-span-3">
                                            {item.name}
                                            {item._id === user?._id && (
                                                <span className="text-xs">
                                                    &nbsp;(bạn)
                                                </span>
                                            )}
                                        </p>
                                        <p className="col-span-1">
                                            {item.score}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <MenuBarBottom />
        </DefaultLayout>
    );
};
