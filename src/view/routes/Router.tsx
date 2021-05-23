import React, { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { UserRole } from 'src/domain/user';
import {
    AccountScreen,
    ClassroomsScreen,
    HomeScreen,
    LoginScreen,
    MessageScreen,
    RanksScreen,
    RegisterScreen,
    ReportsScreen,
} from 'src/view/screens';
import { PrivateRoute, PublicOnlyRoute } from './ControlledRoute';

export enum Screen {
    Home = '/',
    Ranks = '/ranks',
    Message = '/message',
    Account = '/account',
    Login = '/login',
    Register = '/register',
    Classrooms = '/classrooms',
    Reports = '/reports',
}

const Router: FC = () => {
    return (
        <BrowserRouter>
            <TransitionGroup component="div" className="h-full">
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

                    <PrivateRoute exact path={Screen.Ranks}>
                        <RanksScreen />
                    </PrivateRoute>

                    <PrivateRoute exact path={Screen.Message}>
                        <MessageScreen />
                    </PrivateRoute>

                    <PrivateRoute exact path={Screen.Account}>
                        <AccountScreen />
                    </PrivateRoute>

                    <PrivateRoute path={Screen.Classrooms}>
                        <ClassroomsScreen />
                    </PrivateRoute>

                    <PrivateRoute
                        exact
                        requiredRoles={UserRole.teacher}
                        path={Screen.Reports}
                    >
                        <ReportsScreen />
                    </PrivateRoute>
                </Switch>
            </TransitionGroup>
        </BrowserRouter>
    );
};

export default Router;
