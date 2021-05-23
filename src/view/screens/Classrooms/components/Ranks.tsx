import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dataClassrooms } from 'src/utils/dummy';
import { Alert } from 'src/view/components/alert';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useAuth } from 'src/view/hooks';
import { useMessageData } from 'src/view/hooks/message';
import { useRanks } from 'src/view/hooks/ranks';
import { Screen } from 'src/view/routes/Router';

type IProps = {};

export const Ranks: FC<IProps> = () => {
    const [classSelected, setClassSelected] = useState<string>('1');
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();
    const { data: ranks, isValidating, error } = useRanks(classSelected);

    const { user } = useAuth();

    useEffect(() => {
        if (error) setMessage(error.message);
    }, [error, setMessage]);

    return (
        <div className="relative shadow-xl border-2 border-darkGray w-full h-full col-span-1 rounded-2xl ">
            <Spinner className="rounded-xl" loading={isValidating} />
            <Alert
                isSuccess={isSuccess}
                message={message}
                clearMessage={clearMessage}
            />
            <h1 className="p-2 pl-4 w-full text-left border-b border-white border-opacity-25 lg:text-2xl text-xl text-white">
                Bảng xếp hạng ( TOP - 5 )
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
                            className="md:px-3 lg:px-4"
                            onClick={(): void =>
                                setClassSelected(classroom.nameClass)
                            }
                        />
                    );
                })}
            </div>
            <div className="overflow-y-auto h-full mx-2">
                <div className="grid grid-cols-5 text-center text-white mb-2">
                    <p className="col-span-1">STT</p>
                    <p className="col-span-3">Tên</p>
                    <p className="col-span-1">Điểm</p>
                </div>
                {ranks && !!ranks.length ? (
                    <>
                        {ranks.map((item, index) => {
                            return (
                                <div
                                    key={item.id}
                                    className={`grid grid-cols-5 text-center text-white mb-1 text-lg  py-2 rounded-lg ${item.id ===
                                        user?.id && 'bg-dodgerBlue'}`}
                                >
                                    <p className="col-span-1">{index + 1}</p>
                                    <p className="col-span-3">
                                        {item.name}
                                        {item.id === user?.id && (
                                            <span className="text-xs">
                                                &nbsp;(bạn)
                                            </span>
                                        )}
                                    </p>
                                    <p className="col-span-1">{item.score}</p>
                                </div>
                            );
                        })}
                        <div className="text-center hover:underline cursor-pointer mt-2 pt-2 pb-4 text-white border-t-1.6px border-white border-opacity-25">
                            <Link to={Screen.Ranks}>Xem thêm...</Link>
                        </div>
                    </>
                ) : (
                    <div className="z-10 text-center pb-3 text-white mt-4 text-base">
                        Chưa có dữ liệu ...
                    </div>
                )}
            </div>
        </div>
    );
};
