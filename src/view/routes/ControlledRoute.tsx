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
    console.log(isAuthenticated);
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

interface ConfirmRedirectRouteProps extends RouteProps {
    urlNotConfirm?: string;
}

export const ConfirmRedirectRoute: FC<ConfirmRedirectRouteProps> = ({
    children,
    urlNotConfirm, // This is the page where the user can switch to other pages without the need to display the confirm modal
    ...props
}) => {
    const history = useHistory();

    const [pageToCome, setPageToCome] = useState<string | undefined>(undefined);

    const currentPage = `${props.path}`;

    return (
        <PrivateRoute {...props}>
            {pageToCome && (
                <ModalConfirm
                    onAgree={(): void => {
                        history.push(pageToCome);
                    }}
                    onCancel={(): void => {
                        setPageToCome(undefined);
                    }}
                    title="Bạn có chắc chắn muốn thoát"
                />
            )}
            <Prompt
                when={
                    !pageToCome && history.location.pathname !== urlNotConfirm
                    // at urlNotConfirm => user can switch to another page without showing confirm modal
                }
                message={(location): boolean => {
                    // location.pathname: is the page the user wants to redirect to
                    const isExitCurrentPage = !location.pathname.startsWith(
                        currentPage,
                    );
                    if (isExitCurrentPage) {
                        // When users want to switch to other pages
                        setPageToCome(location.pathname);
                        return false;
                    }
                    return true;
                }}
            />
            {children}
        </PrivateRoute>
    );
};
