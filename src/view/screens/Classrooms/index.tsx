import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from 'src/domain/user';
import { dataClassrooms } from 'src/utils/dummy';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { useRoleUserAuthenticated } from 'src/view/hooks/role';
import { Theme3 } from 'src/view/layout/components/Theme3';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { Header } from 'src/view/layout/Header';
import { Screen } from 'src/view/routes/Router';
import { CardClassroom } from './components/CardClassroom';
import { Ranks } from './components/Ranks';
import { MenuBarBottom } from 'src/view/components/menu/MenuBarBottom';

type IProps = {};

export const Classrooms: FC<IProps> = () => {
    const isTeacher = useRoleUserAuthenticated(UserRole.teacher);

    return (
        <DefaultLayout>
            <Theme3 />
            <div className="h-screen relative overflow-y-auto">
                <Header />
                <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-5 mt-8 xl:px-16 md:px-10 xs:px-8 px-4 pb-12">
                    <div className="mx-auto xl:col-span-2 md:col-span-3 xl:w-400px">
                        <div className="flex items-center justify-between xs:gap-8 gap-5">
                            <CardClassroom classroom={dataClassrooms[0]} />
                            <CardClassroom classroom={dataClassrooms[1]} />
                        </div>
                        <div className="flex w-full items-center justify-center ss:mt-8 mt-6">
                            <div className="mx-auto">
                                <CardClassroom classroom={dataClassrooms[2]} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between ss:mt-8 mt-6">
                            <CardClassroom classroom={dataClassrooms[3]} />
                            <CardClassroom classroom={dataClassrooms[4]} />
                        </div>
                    </div>
                    <div className="md:block xl:col-span-1 md:col-span-2 hidden">
                        <Ranks />
                    </div>
                </div>
                {isTeacher && (
                    <div className="absolute bottom-0 w-full flex justify-center mb-10">
                        <Link to={Screen.Classrooms}>
                            <PrimaryButton color="green" title="Thêm câu hỏi" />
                        </Link>
                    </div>
                )}
            </div>
            <MenuBarBottom />
        </DefaultLayout>
    );
};
