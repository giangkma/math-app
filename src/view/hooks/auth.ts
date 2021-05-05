import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { UserRedux } from 'src/state/reducers';

// hook check if user logged in
export const useAuthenticated = (): boolean => {
    const user = useSelector(
        R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUser),
    );

    return !!user;
};

export const useAuth = () => {
    const user = useSelector(
        R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUser),
    );
    return {
        user,
    };
};
