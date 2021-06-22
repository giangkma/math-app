import * as R from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import container from 'src/container';
import { UserRedux } from 'src/state/reducers';
import { UserThunks } from 'src/state/thunks';

const {
    cradle: { authService },
} = container;
// hook check if user logged in
export const useAuthenticated = (): boolean => {
    const token = authService.getToken();
    return !!token;
};

export const useAuth = () => {
    const dispatch = useDispatch();

    const onLogout = (): void => {
        dispatch(UserThunks.onLogoutThunk());
    };
    const user = useSelector(
        R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUser),
    );
    return {
        user,
        onLogout,
    };
};
