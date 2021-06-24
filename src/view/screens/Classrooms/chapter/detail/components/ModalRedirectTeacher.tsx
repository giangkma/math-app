import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { CloseIconSVG } from 'src/assets/svg';
import { AppModal } from 'src/view/components/modal/AppModal';

type IProps = {
    classNameContainer?: string;
};

export const ModalRedirectTeacher: FC<IProps> = ({ classNameContainer }) => {
    const history = useHistory();

    const onGree = useCallback(() => {
        history.goBack();
    }, [history]);
    return (
        <div
            className={`absolute z-50 w-full h-full px-4 bg-black bg-opacity-75 top-0 left-0 flex items-center justify-center ${classNameContainer}`}
        >
            <AppModal clickOutside={onGree}>
                <div className="bg-white rounded-xl px-8 py-5 pb-8 relative">
                    <button
                        type="button"
                        className="outline-none bg-white border-2 border-gray-500 rounded-full shadow-lg absolute top-0 right-0 -m-3 p-1 hover:underline group hover:border-sunsetOrange hover:bg-sunsetOrange focus:outline-none transition duration-300"
                        onClick={onGree}
                    >
                        <CloseIconSVG className="w-6 h-6 text-nobelGray group-hover:text-white" />
                    </button>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center mt-3">
                            <span className="ml-2">
                                Lưu ý : Nếu bạn là giáo viên, thì bạn không thể
                                giam gia trả lời câu hỏi !
                            </span>
                        </div>
                    </div>
                    <div className="w-full mt-6 text-right">
                        <button
                            type="button"
                            onClick={onGree}
                            className="px-4 py-1 rounded-full outline-none focus:outline-none border-1.6px border-nobelGray hover:bg-nobelGray hover:text-white transition duration-200"
                        >
                            Đã hiểu
                        </button>
                    </div>
                </div>
            </AppModal>
        </div>
    );
};
