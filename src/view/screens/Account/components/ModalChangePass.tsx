import { yupResolver } from '@hookform/resolvers';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CloseIconSVG } from 'src/assets/svg';
import container from 'src/container';
import { ChangePassword } from 'src/domain/user';
import { ChangePassForm, ChangePassFormSchema } from 'src/domain/user/schema';
import { showToatify } from 'src/helper/toat';
import { Alert } from 'src/view/components/alert';
import { InputPassword } from 'src/view/components/input/InputPassword';
import { Spinner } from 'src/view/components/loading/Spinner';
import { AppModal } from 'src/view/components/modal/AppModal';
import { useMessageData } from 'src/view/hooks/message';

type IProps = {
    classNameContainer?: string;
    onCancel: () => void;
};

const {
    cradle: { userService },
} = container;

export const ModalChangePass: FC<IProps> = ({
    classNameContainer,
    onCancel,
}) => {
    const { register, handleSubmit, errors } = useForm<ChangePassForm>({
        resolver: yupResolver(ChangePassFormSchema),
    });

    const { isSuccess, message, setMessage, clearMessage } = useMessageData();

    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (data: ChangePassword): Promise<void> => {
        try {
            setLoading(true);
            await userService.changePassword(data);
            showToatify('success', 'Đổi mật khẩu thành công !');
            onCancel();
        } catch (error) {
            setMessage({ message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`absolute z-50 w-full h-full px-4 bg-black bg-opacity-75 top-0 left-0 flex items-center justify-center ${classNameContainer}`}
        >
            <Spinner loading={loading} />
            <AppModal clickOutside={onCancel}>
                <div className="bg-gray-900 transform scale-100 transition duration-500 sm:w-400px w-350px text-white rounded-xl px-8 py-8 relative">
                    <button
                        type="button"
                        className="outline-none bg-white border-2 border-gray-500 rounded-full shadow-lg absolute top-0 right-0 -m-3 p-1 hover:underline group hover:border-sunsetOrange hover:bg-sunsetOrange focus:outline-none transition duration-300"
                        onClick={onCancel}
                    >
                        <CloseIconSVG className="w-6 h-6 text-nobelGray group-hover:text-white" />
                    </button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <p className="text-xl">Thay đổi mật khẩu</p>
                            <Alert
                                isSuccess={isSuccess}
                                message={message}
                                clearMessage={clearMessage}
                            />
                            <div className="my-6">
                                <InputPassword
                                    placeholder="Mật khẩu cũ"
                                    name="password"
                                    msg={errors.password}
                                    register={register}
                                />
                                <InputPassword
                                    placeholder="Mật khẩu mới"
                                    name="newPassword"
                                    msg={errors.newPassword}
                                    register={register}
                                />
                                <InputPassword
                                    placeholder="Nhập lại mật khẩu mới"
                                    name="reNewPassword"
                                    msg={errors.reNewPassword}
                                    register={register}
                                />
                            </div>
                        </div>
                        <div className="w-full text-right mt-8 xs:text-lg text-base">
                            <button
                                type="submit"
                                className="px-4 py-1 rounded-full outline-none focus:outline-none border-1.6px border-nobelGray hover:bg-nobelGray hover:text-white transition duration-200"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </AppModal>
        </div>
    );
};
