import React, { FC } from 'react';

type IProps = {
    title: string;
    classNameContainer?: string;
    onAgree: () => void;
    onCancel: () => void;
};

export const ModalConfirm: FC<IProps> = ({
    classNameContainer,
    title,
    onAgree,
    onCancel,
}) => {
    return (
        <div
            className={`fixed z-50 inset-0 text-black overflow-y-auto ${classNameContainer}`}
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-12 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-black bg-opacity-75 z-50"></div>
                </div>

                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div
                    className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="bg-white rounded-30px px-20 py-16">
                        <p className="text-xl">{title}</p>
                        <div className="mt-4 text-lg">
                            <button
                                type="button"
                                onClick={onAgree}
                                className="px-4 py-1 rounded-full outline-none focus:outline-none border-1.6px border-nobelGray mr-3 hover:bg-nobelGray hover:text-white transition duration-200"
                            >
                                Thoát
                            </button>
                            <button
                                type="button"
                                className="outline-none hover:underline focus:outline-none"
                                onClick={onCancel}
                            >
                                Không
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
