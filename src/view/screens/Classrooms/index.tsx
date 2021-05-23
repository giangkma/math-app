import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { UserRole } from 'src/domain/user';
import { dataClassrooms } from 'src/utils/dummy';
import { MenuBarBottom } from 'src/view/components/menu/MenuBarBottom';
import { PageTransittion } from 'src/view/components/PageTransittion';
import { Theme3 } from 'src/view/layout/components/Theme3';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { Header } from 'src/view/layout/Header';
import { PrivateRoute } from 'src/view/routes/ControlledRoute';
import { AddQuestion } from './addQuestion';
import { ChapterDetail } from './chapter/detail';
import { ChapterList } from './chapter/list';
import { CardClassroom } from './components/CardClassroom';
import { Ranks } from './components/Ranks';

type IProps = {};

export const Classrooms = (): JSX.Element => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path}>
                <ClassroomList />
            </Route>

            <Route exact path={`${path}/:className`}>
                <ChapterList />
            </Route>

            <PrivateRoute
                exact
                requiredRoles={UserRole.teacher}
                path={`${path}/:className/add-questions`}
            >
                <AddQuestion />
            </PrivateRoute>

            <Route exact path={`${path}/:className/:chapter`}>
                <ChapterDetail />
            </Route>
        </Switch>
    );
};

const ClassroomList: FC<IProps> = () => {
    return (
        <DefaultLayout title="Danh sách lớp học">
            <Theme3 />
            <div className="h-screen relative overflow-y-auto">
                <Header />
                <PageTransittion>
                    <div className="flex items-center justify-center h-full xl:gap-40 gap-20 sm:mt-12 mt-4 xl:px-16 md:px-10 px-4 md:pb-12 sm:pb-40 pb-32">
                        <div className="">
                            <div className="flex items-center justify-between xs:gap-8 gap-5">
                                <CardClassroom classroom={dataClassrooms[0]} />
                                <CardClassroom classroom={dataClassrooms[1]} />
                            </div>
                            <div className="flex w-full items-center justify-center md:my-8 my-4 xs:gap-8 gap-5">
                                <div className="mx-auto">
                                    <CardClassroom
                                        classroom={dataClassrooms[2]}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between xs:gap-8 gap-5">
                                <CardClassroom classroom={dataClassrooms[3]} />
                                <CardClassroom classroom={dataClassrooms[4]} />
                            </div>
                        </div>
                        <div className="md:block hidden">
                            <Ranks />
                        </div>
                    </div>
                </PageTransittion>
            </div>
            <MenuBarBottom />
        </DefaultLayout>
    );
};
