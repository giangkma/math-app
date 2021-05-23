/* @flow */
import React, { FC, useState } from 'react';
import {
    Prompt,
    Redirect,
    Route,
    RouteProps,
    useHistory,
} from 'react-router-dom';
import { UserRole } from 'src/domain/user';
import { useAuthenticated } from '../hooks';
import { useRoleUserAuthenticated } from '../hooks/role';
import { Screen } from './Router';
import { ModalConfirm } from 'src/view/components/modal/ModalConfirm';

interface Props extends RouteProps {
    redirectUrl?: string;
    requiredRoles?: UserRole;
}

export const PrivateRoute: FC<Props> = ({
    children,
    redirectUrl = Screen.Login,
    requiredRoles,
    ...props
}) => {
    const isAuthenticated = useAuthenticated();
    const isAcceptedRole = useRoleUserAuthenticated(requiredRoles);
    return (
        <Route {...props}>
            {isAuthenticated && isAcceptedRole ? (
                children
            ) : (
                <Redirect to={redirectUrl} />
            )}
        </Route>
    );
};

export const PublicOnlyRoute: FC<Props> = ({
    children,
    redirectUrl = Screen.Classrooms,
    ...props
}) => {
    const isAuthenticated = useAuthenticated();

    return (
        <Route {...props}>
            {!isAuthenticated ? children : <Redirect to={redirectUrl} />}
        </Route>
    );
};
