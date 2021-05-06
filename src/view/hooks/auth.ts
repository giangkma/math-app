import * as R from 'ramda';
import { useSelector } from 'react-redux';
import container from 'src/container';
import { UserRedux } from 'src/state/reducers';

const {
    cradle: { authService },
} = container;
// hook check if user logged in
export const useAuthenticated = (): boolean => {
    const token = authService.getToken();
    return !!token;
};

export const useAuth = () => {
    const user = useSelector(
        R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUser),
    );
    return {
        user,
    };
};
