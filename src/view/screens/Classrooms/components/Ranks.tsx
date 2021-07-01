import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dataClassrooms } from 'src/utils/dummy';
import { getInitialName } from 'src/utils/stringUtils';
import { Alert } from 'src/view/components/alert';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useAuth } from 'src/view/hooks';
import { useMessageData } from 'src/view/hooks/message';
import { useRanks } from 'src/view/hooks/ranks';
import { Screen } from 'src/view/routes/Router';
import avatarDefault from 'src/assets/images/client_default.png';

type IProps = {};

export const Ranks: FC<IProps> = () => {
    const [classSelected, setClassSelected] = useState<string>('1');
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();
    const { data: ranks, error } = useRanks(classSelected);

    const { user } = useAuth();

    useEffect(() => {
        if (error) setMessage(error.message);
    }, [error, setMessage]);

    return (
        <div className="relative shadow-xl border-2 border-darkGray w-full h-full col-span-1 rounded-2xl ">
            <Spinner className="rounded-xl" loading={!ranks} />
            <Alert
                isSuccess={isSuccess}
                message={message}
                clearMessage={clearMessage}
            />
            <h1 className="p-2 pl-4 w-full text-left border-b border-white border-opacity-25 lg:text-2xl text-xl text-white">
                Bảng xếp hạng ( TOP - 5 )
            </h1>
            <div className="p-2 flex items-center justify-between">
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
                            className="md:px-3 lg:px-4 px-2 mx-1"
                            onClick={(): void =>
                                setClassSelected(classroom.nameClass)
                            }
                        />
                    );
                })}
            </div>
            <div className="overflow-y-auto h-full mx-2">
                <div className="flex items-center  justify-between text-center text-white mb-2">
                    <p className="flex-1">STT</p>
                    <p className="flex-1"></p>
                    <p className="flex-3">Tên</p>
                    <p className="flex-1">Điểm</p>
                </div>
                {ranks && !!ranks.length ? (
                    ranks.slice(0, 5).map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className={`flex items-center justify-between text-center text-white mb-1 text-base  py-2 rounded-lg ${item.id ===
                                    user?.id && 'bg-dodgerBlue'}`}
                            >
                                <p className="flex-1">{index + 1}</p>
                                <div className="flex-1">
                                    {item.avatar ? (
                                        <img
                                            className="w-10 h-10 rounded-full object-cover"
                                            src={
                                                item.avatar
                                                    ? item.avatar
                                                    : avatarDefault
                                            }
                                            alt=""
                                        />
                                    ) : (
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-black ">
                                            {item && getInitialName(item)}
                                        </div>
                                    )}
                                </div>
                                <p className="flex-3 text-lg">
                                    {item.name}
                                    {item.id === user?.id && (
                                        <span className="text-xs">
                                            &nbsp;(bạn)
                                        </span>
                                    )}
                                </p>
                                <p className="flex-1 text-lg">{item.score}</p>
                            </div>
                        );
                    })
                ) : (
                    <div className="z-10 text-center text-white mt-4 sm:text-xl text-base">
                        Chưa có dữ liệu ...
                    </div>
                )}
                <div className="text-center hover:underline cursor-pointer mt-2 pt-2 pb-4 text-white border-t-1.6px border-white border-opacity-25">
                    <Link to={Screen.Ranks}>Xem thêm...</Link>
                </div>
            </div>
        </div>
    );
};
