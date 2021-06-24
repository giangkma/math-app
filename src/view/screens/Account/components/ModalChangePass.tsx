import React, { FC } from 'react';
import { CloseIconSVG } from 'src/assets/svg';
import { InputPassword } from 'src/view/components/input/InputPassword';
import { AppModal } from 'src/view/components/modal/AppModal';

type IProps = {
    classNameContainer?: string;
    onAgree: () => void;
    onCancel: () => void;
};

export const ModalChangePass: FC<IProps> = ({
    classNameContainer,
    onAgree,
    onCancel,
}) => {
    return (
        <div
            className={`absolute z-50 w-full h-full px-4 bg-black bg-opacity-75 top-0 left-0 flex items-center justify-center ${classNameContainer}`}
        >
            <AppModal clickOutside={onCancel}>
                <div className="bg-gray-900 transform scale-100 transition duration-500 sm:w-400px w-350px text-white rounded-xl px-8 py-8 relative">
                    <button
                        type="button"
                        className="outline-none bg-white border-2 border-gray-500 rounded-full shadow-lg absolute top-0 right-0 -m-3 p-1 hover:underline group hover:border-sunsetOrange hover:bg-sunsetOrange focus:outline-none transition duration-300"
                        onClick={onCancel}
                    >
                        <CloseIconSVG className="w-6 h-6 text-nobelGray group-hover:text-white" />
                    </button>
                    <div>
                        <p className="text-xl">Thay đổi mật khẩu</p>
                        <form action="" className="my-6">
                            <InputPassword
                                placeholder="Mật khẩu cũ"
                                name="password"
                            />
                            <InputPassword
                                placeholder="Mật khẩu mới"
                                name="password"
                            />
                            <InputPassword
                                placeholder="Nhập lại mật khẩu mới"
                                name="password"
                            />
                        </form>
                    </div>
                    <div className="w-full text-right mt-8 xs:text-lg text-base">
                        <button
                            type="button"
                            onClick={onAgree}
                            className="px-4 py-1 rounded-full outline-none focus:outline-none border-1.6px border-nobelGray hover:bg-nobelGray hover:text-white transition duration-200"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </AppModal>
        </div>
    );
};
