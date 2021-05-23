import React, { FC } from 'react';
import { CloseIconSVG } from 'src/assets/svg';
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
                <div className="bg-white rounded-xl px-8 py-8 relative">
                    <button
                        type="button"
                        className="outline-none bg-white border-2 border-gray-500 rounded-full shadow-lg absolute top-0 right-0 -m-3 p-1 hover:underline group hover:border-sunsetOrange hover:bg-sunsetOrange focus:outline-none transition duration-300"
                        onClick={onCancel}
                    >
                        <CloseIconSVG className="w-6 h-6 text-nobelGray group-hover:text-white" />
                    </button>
                    <p className="xs:text-xl text-lg">{title}</p>
                    <div className="w-full text-right mt-4 xs:text-lg text-base">
                        <button
                            type="button"
                            onClick={onAgree}
                            className="px-4 py-1 rounded-full outline-none focus:outline-none border-1.6px border-nobelGray mr-3 hover:bg-nobelGray hover:text-white transition duration-200"
                        >
                            Thoát
                        </button>
                    </div>
                </div>
            </AppModal>
        </div>
    );
};
