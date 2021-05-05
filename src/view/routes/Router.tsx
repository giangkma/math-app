import React, { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import {
    ClassroomsScreen,
    LoginScreen,
    RegisterScreen,
    ClassroomDetailScreen,
    HomeScreen,
} from 'src/view/screens';
import {
    ConfirmRedirectRoute,
    PrivateRoute,
    PublicOnlyRoute,
} from './ControlledRoute';

export enum Screen {
    Home = '/',
    Login = '/login',
    Register = '/Register',
    Classrooms = '/classrooms',
}

const Router: FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PublicOnlyRoute exact path={Screen.Home}>
                    <HomeScreen />
                </PublicOnlyRoute>

                <PublicOnlyRoute path={Screen.Login}>
                    <LoginScreen />
                </PublicOnlyRoute>

                <PublicOnlyRoute path={Screen.Register}>
                    <RegisterScreen />
                </PublicOnlyRoute>

                <PrivateRoute exact path={Screen.Classrooms}>
                    <ClassroomsScreen />
                </PrivateRoute>

                <ConfirmRedirectRoute
                    exact
                    path={`${Screen.Classrooms}/:className`}
                >
                    <ClassroomDetailScreen />
                </ConfirmRedirectRoute>

                {/* <PrivateRoute
                    requiredRoles={[UserRole.organization]}
                    path={Screen.MyCreators}
                >
                    <MyCreatorsScreen />
                </PrivateRoute> */}
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
