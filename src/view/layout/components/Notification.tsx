import React, { FC, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'src/view/components/alert';
import { Spinner } from 'src/view/components/loading/Spinner';
import { AppModal } from 'src/view/components/modal/AppModal';
import { useMessageData } from 'src/view/hooks/message';
import { useReport } from 'src/view/hooks/report';
import { Screen } from 'src/view/routes/Router';

type IProps = {};

export const Notification: FC<IProps> = () => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();

    const { data: reports, isValidating, error } = useReport();

    const toggleModal = (): void => {
        setIsShowModal(prev => !prev);
    };

    const closeModal = useCallback((): void => {
        setIsShowModal(false);
    }, []);

    useEffect(() => {
        if (error) setMessage(error.message);
    }, [error, setMessage]);

    return (
        <AppModal clickOutside={closeModal}>
            <button
                className="outline-none focus:outline-none text-white hover:bg-white hover:bg-opacity-25 transition duration-300 rounded-full flex items-center relative justify-center p-1"
                type="button"
                onClick={toggleModal}
            >
                <svg
                    className="md:w-12 md:h-12 xs:w-10 xs:h-10 h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                </svg>
                {reports && !!reports.length && (
                    <div className="w-5 h-5 rounded-full bg-red-600 absolute top-0 right-0 flex items-center justify-center">
                        {reports.length}
                    </div>
                )}
            </button>
            {isShowModal && (
                <div className="absolute text-gray-700 pb-3 sm:pb-6  bg-white py-2 rounded-xl top-0 right-0 mt-16 -mr-2 sm:mr-10 lg:mr-8 z-30">
                    <p className=" md:text-2xl text-xl text-gray-700 px-4 font-bold text-left text-opacity-50">
                        Thông báo
                    </p>
                    <div
                        style={{
                            maxHeight: '500px',
                        }}
                        className="w-64 md:w-75"
                    >
                        {reports &&
                            (!!reports.length ? (
                                <>
                                    <div className="flex pb-2 border-b-1.6px border-gray-300 items-center px-4 justify-between">
                                        <p className="text-gray-700">
                                            Báo cáo câu hỏi
                                        </p>
                                        <Link to={Screen.Reports}>
                                            <p className="text-dodgerBlue hover:underline">
                                                Xem tất cả
                                            </p>
                                        </Link>
                                    </div>
                                    <div className="overflow-y-auto">
                                        <Alert
                                            isSuccess={isSuccess}
                                            message={message}
                                            clearMessage={clearMessage}
                                        />
                                        <Spinner
                                            className="rounded-xl"
                                            loading={isValidating}
                                        />
                                        {reports &&
                                            reports.map(report => {
                                                const { senders } = report;
                                                return (
                                                    <Link
                                                        key={report.id}
                                                        to={{
                                                            pathname:
                                                                Screen.Reports,
                                                            state: {
                                                                questionId:
                                                                    report.questionId,
                                                            },
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-2 px-2 py-2 mx-2 rounded-lg mt-2 hover:bg-gray-200">
                                                            <div className="w-12 h-10 bg-gray-400 rounded-full"></div>
                                                            <div className="w-full text-sm text-left">
                                                                <span className="text-base font-semibold">
                                                                    {
                                                                        senders[
                                                                            senders.length -
                                                                                1
                                                                        ]
                                                                    }
                                                                    &nbsp;
                                                                </span>
                                                                {senders.length >
                                                                    1 && (
                                                                    <span>
                                                                        và{' '}
                                                                        {senders.length -
                                                                            1}
                                                                        &nbsp;người
                                                                        khác&nbsp;
                                                                    </span>
                                                                )}
                                                                <span>
                                                                    đã gửi báo
                                                                    cáo
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                    </div>
                                </>
                            ) : (
                                <p className="mt-4 px-4">Không có thông báo</p>
                            ))}
                    </div>
                </div>
            )}
        </AppModal>
    );
};
