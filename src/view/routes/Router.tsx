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
import { PageShell } from '../components/PageShell';
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
                        <PageShell>
                            <HomeScreen />
                        </PageShell>
                    </PublicOnlyRoute>

                    <PublicOnlyRoute path={Screen.Login}>
                        <PageShell>
                            <LoginScreen />
                        </PageShell>
                    </PublicOnlyRoute>

                    <PublicOnlyRoute path={Screen.Register}>
                        <PageShell>
                            <RegisterScreen />
                        </PageShell>
                    </PublicOnlyRoute>

                    <PrivateRoute exact path={Screen.Ranks}>
                        <PageShell>
                            <RanksScreen />
                        </PageShell>
                    </PrivateRoute>

                    <PrivateRoute exact path={Screen.Message}>
                        <PageShell>
                            <MessageScreen />
                        </PageShell>
                    </PrivateRoute>

                    <PrivateRoute exact path={Screen.Account}>
                        <PageShell>
                            <AccountScreen />
                        </PageShell>
                    </PrivateRoute>

                    <PrivateRoute path={Screen.Classrooms}>
                        <ClassroomsScreen />
                    </PrivateRoute>

                    <PrivateRoute
                        exact
                        requiredRoles={UserRole.teacher}
                        path={Screen.Reports}
                    >
                        <PageShell>
                            <ReportsScreen />
                        </PageShell>
                    </PrivateRoute>
                </Switch>
            </TransitionGroup>
        </BrowserRouter>
    );
};

export default Router;
