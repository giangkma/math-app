import { yupResolver } from '@hookform/resolvers';
import { default as React, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DataRegister } from 'src/domain/user';
import { RegisterForm, RegisterFormSchema } from 'src/domain/user/schema';
import { showToatify } from 'src/helper/toat';
import { UserThunks } from 'src/state/thunks';
import { Alert } from 'src/view/components/alert';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { InputPassword } from 'src/view/components/input/InputPassword';
import { InputText } from 'src/view/components/input/InputText';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useMessageData } from 'src/view/hooks/message';
import { Screen } from 'src/view/routes/Router';

export const Register: FC = () => {
    const dispatch = useDispatch();
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();

    const [loading, setLoading] = useState<boolean>(false);

    const { register, handleSubmit, errors } = useForm<RegisterForm>({
        resolver: yupResolver(RegisterFormSchema),
    });

    const onSubmit = async (data: DataRegister): Promise<void> => {
        try {
            setLoading(true);

            await dispatch(UserThunks.onRegisterThunk(data));
            showToatify('success', 'Đăng ký thành công, chào mừng bạn !');
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
                <Link to={Screen.Login}>
                    <PrimaryButton
                        title="Đăng nhập"
                        className="w-full px-10 py-2"
                        color="blue"
                    />
                </Link>
            </div>
            <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <div className="text-lightPeach text-xl">
                    <h1 className="text-3xl">Đăng ký tài khoản</h1>
                    <h1>Hãy nhập đầy đủ thông tin !</h1>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center justify-center w-full mt-6"
                >
                    <div className="w-75 text-xl">
                        <InputText
                            msg={errors.name}
                            register={register}
                            name="name"
                            placeholder="Họ và tên"
                        />
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
                            title="Đăng ký"
                            className="w-full py-2"
                            submit
                            color="green"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
