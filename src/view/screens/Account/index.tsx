import { yupResolver } from '@hookform/resolvers';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import avatarDefault from 'src/assets/images/client_default.png';
import { CameraIconSVG } from 'src/assets/svg';
import container from 'src/container';
import { UpdateProfile } from 'src/domain/user';
import { ProfileForm, ProfileFormSchema } from 'src/domain/user/schema';
import { showToatify } from 'src/helper/toat';
import { UserActions } from 'src/state/_actions';
import { Alert } from 'src/view/components/alert';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { InputText } from 'src/view/components/input/InputText';
import { Spinner } from 'src/view/components/loading/Spinner';
import { MenuBarBottom } from 'src/view/components/menu/MenuBarBottom';
import { useAuth } from 'src/view/hooks';
import { useMessageData } from 'src/view/hooks/message';
import { Theme3 } from 'src/view/layout/components/Theme3';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { HeaderBack } from 'src/view/layout/HeaderBack';
import { Screen } from 'src/view/routes/Router';
import { ModalChangePass } from './components/ModalChangePass';

interface ProfileFormType {
    avatar: FileList;
    name: string;
}

const {
    cradle: { userService },
} = container;

export const Account: FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState<string>('');

    const { register, handleSubmit, errors, reset } = useForm<ProfileForm>({
        resolver: yupResolver(ProfileFormSchema),
        defaultValues: {
            name: user?.name ?? '',
            username: user?.username ?? '',
        },
    });

    const [isChangePass, setIsChangePass] = useState<boolean>(false);

    const onHideModal = useCallback(() => {
        setIsChangePass(false);
    }, []);

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { files } = e.target;
        if (!files?.length) return;

        if (files[0].type !== 'image/png' && files[0].type !== 'image/jpeg') {
            console.log(1);

            return;
        }
        URL.revokeObjectURL(imagePreview);
        setImagePreview(URL.createObjectURL(files[0]));
    };

    const onSubmit = async (value: ProfileFormType): Promise<void> => {
        try {
            setLoading(true);
            let avatar;
            if (value.avatar[0]) {
                avatar = await userService.uploadAvatar(value.avatar[0]);
            }
            const dataForm = {
                name: value.name,
            } as UpdateProfile;

            if (avatar) {
                dataForm.avatar = avatar.file.url;
            }
            const information = await userService.updateProfile(dataForm);
            dispatch(UserActions.setUser(information));
            showToatify('success', 'Cập nhật thành công !');
        } catch (error) {
            setMessage({ message: 'Đã xảy ra lỗi !' });
        } finally {
            setLoading(false);
        }
    };

    const renderAvatar = (): string => {
        if (!user) return '';
        if (user.avatar && !imagePreview) {
            return user.avatar;
        }
        if (imagePreview && user.avatar) {
            return imagePreview;
        }
        return avatarDefault;
    };

    useEffect(() => {
        if (!user) return;
        reset({
            name: user.name,
            username: user.username,
        });
    }, [reset, user]);

    return (
        <DefaultLayout>
            {isChangePass && (
                <ModalChangePass onAgree={onHideModal} onCancel={onHideModal} />
            )}
            <Theme3 />
            <div className="h-screen relative">
                <HeaderBack
                    title={`Thông tin cá nhân`}
                    to={Screen.Classrooms}
                />
                <Spinner className="rounded-xl" loading={loading} />
                <div className="sm:w-500px w-full sm:mx-auto overflow-y-auto pb-32 p-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <input
                            type="file"
                            name="avatar"
                            id="chooseAvatar"
                            ref={register()}
                            onChange={onImageChange}
                            className="hidden"
                        />
                        <div className="flex flex-col items-center ">
                            <label
                                htmlFor="chooseAvatar"
                                className="cursor-pointer relative bg-black block hover:bg-opacity-50 transition duration-200 w-56 h-56 rounded-full overflow-hidden group"
                            >
                                <img
                                    src={renderAvatar()}
                                    alt="avatar default"
                                    className="object-cover"
                                />
                                <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50 group-hover:opacity-100 transition duration-200 opacity-0" />
                                <CameraIconSVG className="w-10 group-hover:opacity-100 transition duration-200 opacity-0 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </label>
                            <label htmlFor="chooseAvatar" className="mt-5">
                                <div className="px-6 py-1 rounded-full border-1.6px border-woodyBrown cursor-pointer hover:bg-black hover:bg-opacity-50 text-white">
                                    Đổi ảnh đại diện
                                </div>
                            </label>
                        </div>
                        <Alert
                            isSuccess={isSuccess}
                            message={message}
                            clearMessage={clearMessage}
                        />
                        <div className="flex flex-col gap-2 items-center justify-between mt-6">
                            <div className="flex flex-col w-full">
                                <label htmlFor="" className="text-white m-2">
                                    Họ và tên
                                </label>
                                <InputText
                                    name="name"
                                    msg={errors.name}
                                    register={register}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="" className="text-white m-2">
                                    Tên đăng nhập
                                </label>
                                <InputText
                                    disabled
                                    name="username"
                                    msg={errors.username}
                                    register={register}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="" className="text-white m-2">
                                    Mật khẩu
                                </label>
                                <div className="relative">
                                    <InputText
                                        name="username"
                                        disabled
                                        placeholder="**************"
                                    />
                                    <button
                                        type="button"
                                        onClick={(): void =>
                                            setIsChangePass(true)
                                        }
                                        className="px-4 outline-none focus:outline-none py-1px text-xs transform top-1/2 -translate-y-1/2 right-0 mr-2 text-white rounded-full border-white border-1.6px absolute hover:bg-black hover:bg-opacity-25 trasition duration-200"
                                    >
                                        Thay đổi mật khẩu
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-right mt-10">
                            <PrimaryButton
                                className="px-8 py-1"
                                title="Cập nhật"
                                color="green"
                                submit
                            />
                        </div>
                    </form>
                </div>
            </div>
            <MenuBarBottom />
        </DefaultLayout>
    );
};
