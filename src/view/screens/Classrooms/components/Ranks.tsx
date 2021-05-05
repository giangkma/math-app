import React, { FC, useEffect, useState } from 'react';
import { dataClassrooms } from 'src/utils/dummy';
import { Alert } from 'src/view/components/alert';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useAuth } from 'src/view/hooks';
import { useMessageData } from 'src/view/hooks/message';
import { useRanks } from 'src/view/hooks/ranks';

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
            <Spinner loading={isValidating} />
            <Alert
                isSuccess={isSuccess}
                message={error || message}
                clearMessage={clearMessage}
            />
            <h1 className="p-2 pl-4 w-full text-left border-b border-white border-opacity-25 text-2xl text-white">
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
                            className="px-4 text-base"
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
                                className={`grid grid-cols-5 text-center text-white mb-1 text-lg  py-2 rounded-lg ${item._id ===
                                    user?._id && 'bg-dodgerBlue'}`}
                            >
                                <p className="col-span-1">{index + 1}</p>
                                <p className="col-span-3">
                                    {item.name}
                                    {item._id === user?._id && (
                                        <span className="text-xs">
                                            &nbsp;(bạn)
                                        </span>
                                    )}
                                </p>
                                <p className="col-span-1">{item.score}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
