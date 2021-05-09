import React, { FC } from 'react';
import { AppModal } from './AppModal';

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
            className={`absolute z-50 w-full h-full px-4 bg-black bg-opacity-75 top-0 left-0 flex items-center justify-center ${classNameContainer}`}
        >
            <AppModal clickOutside={onCancel}>
                <div className="bg-white rounded-30px sm:px-20 sm:py-16 px-10 py-8">
                    <p className="xs:text-xl text-lg">{title}</p>
                    <div className="mt-4 xs:text-lg text-base">
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
            </AppModal>
        </div>
    );
};
