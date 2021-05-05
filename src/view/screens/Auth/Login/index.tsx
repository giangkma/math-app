import { yupResolver } from '@hookform/resolvers';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import container from 'src/container';
import { DataLogin } from 'src/domain/user';
import { LoginForm, LoginFormSchema } from 'src/domain/user/schema';
import { showToatify } from 'src/helper/toat';
import { UserThunks } from 'src/state/thunks';
import { UserActions } from 'src/state/_actions';
import { Alert } from 'src/view/components/alert';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { InputPassword } from 'src/view/components/input/InputPassword';
import { InputText } from 'src/view/components/input/InputText';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useMessageData } from 'src/view/hooks/message';
import { Screen } from 'src/view/routes/Router';

export const Login: FC = () => {
    const dispatch = useDispatch();

    const { isSuccess, message, setMessage, clearMessage } = useMessageData();

    const [loading, setLoading] = useState<boolean>(false);

    const { register, handleSubmit, errors } = useForm<LoginForm>({
        resolver: yupResolver(LoginFormSchema),
    });

    const onSubmit = async (data: DataLogin): Promise<void> => {
        try {
            setLoading(true);
            await dispatch(UserThunks.onLoginThunk(data));
            showToatify('success', 'Đăng nhập thành công, chào mừng bạn !');
        } catch (error) {
            setMessage({ message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-woodyBrown h-full ">
            <Spinner loading={loading} />

            <div className="flex w-full item-center justify-between p-5 lg:p-10">
                <h1 className="text-4xl text-white font-bold">Math Example</h1>
                <Link to={Screen.Register}>
                    <PrimaryButton
                        title="Đăng ký"
                        className="w-full px-10 py-2"
                        color="green"
                    />
                </Link>
            </div>
            <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <div className="text-lightPeach text-xl">
                    <h1 className="text-3xl">Xin chào !</h1>
                    <h1>Hãy đăng nhập để tiếp tục</h1>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center justify-center w-full mt-6"
                >
                    <div className="w-75 text-xl">
                        <InputText
                            msg={errors.username}
                            register={register}
                            name="username"
                            placeholder="Tên đăng nhập"
                        />
                        <InputPassword
                            msg={errors.password}
                            register={register}
                            name="password"
                            placeholder="Mật khẩu"
                        />
                        <Alert
                            isSuccess={isSuccess}
                            message={message}
                            clearMessage={clearMessage}
                        />
                        <PrimaryButton
                            title="Đăng nhập"
                            className="w-full py-2"
                            submit
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
