import container from 'src/container';
import { DataLogin, DataRegister } from 'src/domain/user';
import { AppThunk } from 'src/state/common';
import { UserActions } from 'src/state/_actions';

const {
    cradle: { authService },
} = container;

const onLoginThunk = (data: DataLogin): AppThunk => async (
    dispatch,
): Promise<void> => {
    const res = await authService.login(data);

    const { accessToken, information } = res;

    await authService.saveToken(accessToken);
    dispatch(UserActions.setUser(information));
};

const onRegisterThunk = (data: DataRegister): AppThunk => async (
    dispatch,
): Promise<void> => {
    const res = await authService.register(data);

    const { accessToken, information } = res;

    await authService.saveToken(accessToken);
    dispatch(UserActions.setUser(information));
};

const onLogoutThunk = (): AppThunk => async (dispatch): Promise<void> => {
    await authService.removeToken();
    dispatch(UserActions.setUser(undefined));
};

export default {
    onLoginThunk,
    onRegisterThunk,
    onLogoutThunk,
};
