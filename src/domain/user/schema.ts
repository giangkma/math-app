import * as yup from 'yup';

export const LoginFormSchema = yup.object({
    username: yup.string().required('Hãy nhập username'),
    password: yup.string().required('Hãy nhập mật khẩu'),
});

export const ProfileFormSchema = yup.object({
    name: yup.string().required('Hãy nhập tên'),
    username: yup.string(),
});

export const RegisterFormSchema = yup
    .object({
        name: yup.string().required('Hãy nhập tên'),
    })
    .concat(LoginFormSchema);

export type LoginForm = yup.InferType<typeof LoginFormSchema>;
export type ProfileForm = yup.InferType<typeof ProfileFormSchema>;
export type RegisterForm = yup.InferType<typeof RegisterFormSchema>;
