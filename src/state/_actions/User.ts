import { User } from 'src/domain/user';
import { createAction } from 'typesafe-actions';
import { createActionTypePrefixFormat } from '../common';

const typePrefixFormat = createActionTypePrefixFormat('User');

/* ------------- action creators ------------- */
export const setUser = createAction(
    typePrefixFormat('SET_USER'),
    (user?: User) => ({
        user,
    }),
)();

export type UserActions = ReturnType<typeof setUser>;
