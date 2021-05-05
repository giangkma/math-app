import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UserRole } from 'src/domain/user';
import { UserRedux } from 'src/state/reducers';
import * as R from 'ramda';

// hook check if user logged in
export const useRoleUserAuthenticated = (
    role: UserRole | undefined,
): boolean => {
    const user = useSelector(
        R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUser),
    );
    const auth = useMemo(() => {
        if (!role) {
            return true;
        }
        if (!user) {
            return false;
        }

        return role === user.role;
    }, [role, user]);

    return auth;
};
