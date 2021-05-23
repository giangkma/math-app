import React, { FC } from 'react';
import { CloseIconSVG } from 'src/assets/svg';
import { AppModal } from 'src/view/components/modal/AppModal';

type IProps = {
    classNameContainer?: string;
    onCancel: () => void;
    onSend: () => void;
};

export const ModalReport: FC<IProps> = ({
    classNameContainer,
    onCancel,
    onSend,
}) => {
    return (
        <div
            className={`absolute z-50 w-full h-full px-4 bg-black bg-opacity-75 top-0 left-0 flex items-center justify-center ${classNameContainer}`}
        >
            <AppModal clickOutside={onCancel}>
                <div className="bg-white rounded-xl px-8 py-5 pb-8 relative">
                    <button
                        type="button"
                        className="outline-none bg-white border-2 border-gray-500 rounded-full shadow-lg absolute top-0 right-0 -m-3 p-1 hover:underline group hover:border-sunsetOrange hover:bg-sunsetOrange focus:outline-none transition duration-300"
                        onClick={onCancel}
                    >
                        <CloseIconSVG className="w-6 h-6 text-nobelGray group-hover:text-white" />
                    </button>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center mt-3">
                            <input type="checkbox" className="h-5 w-5" />
                            <span className="ml-2">Thiếu dữ liệu đề bài</span>
                        </div>
                        <div className="flex items-center mt-3">
                            <input type="checkbox" className="h-5 w-5" />
                            <span className="ml-2">
                                Đáp án sai, không có đáp án
                            </span>
                        </div>
                        <div className="flex items-center mt-3">
                            <input type="checkbox" className="h-5 w-5" />
                            <span className="ml-2">
                                Câu hỏi không đúng với chương này
                            </span>
                        </div>
                    </div>
                    <div className="w-full mt-6 text-right">
                        <button
                            type="button"
                            onClick={onSend}
                            className="px-4 py-1 rounded-full outline-none focus:outline-none border-1.6px border-nobelGray hover:bg-nobelGray hover:text-white transition duration-200"
                        >
                            Gửi báo cáo
                        </button>
                    </div>
                </div>
            </AppModal>
        </div>
    );
};
