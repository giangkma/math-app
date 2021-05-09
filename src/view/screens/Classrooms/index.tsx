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
import { BirdGreenIconSVG } from 'src/assets/svg';

type IProps = {};

export const Classrooms: FC<IProps> = () => {
    const isTeacher = useRoleUserAuthenticated(UserRole.teacher);

    return (
        <DefaultLayout>
            <Theme3 />
            <div className="h-screen relative overflow-y-auto">
                <Header />
                <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-5 xs:mt-8 mt-4 xl:px-16 md:px-10 xs:px-8 px-4 md:pb-12 sm:pb-40 pb-32">
                    <div className="mx-auto xl:col-span-2 md:col-span-3 xl:w-400px">
                        <div className="flex items-center justify-between xs:gap-8 gap-5">
                            <CardClassroom classroom={dataClassrooms[0]} />
                            <CardClassroom classroom={dataClassrooms[1]} />
                        </div>
                        <div className="flex w-full items-center justify-center xs:mt-8 mt-4 xs:gap-8 gap-5">
                            <div className="mx-auto">
                                <CardClassroom classroom={dataClassrooms[2]} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between xs:mt-8 mt-4 xs:gap-8 gap-5">
                            <CardClassroom classroom={dataClassrooms[3]} />
                            <CardClassroom classroom={dataClassrooms[4]} />
                        </div>
                    </div>
                    <div className="md:block xl:col-span-1 md:col-span-2 hidden">
                        <Ranks />
                    </div>
                    {isTeacher && (
                        <div className="w-full md:hidden flex justify-center mt-8">
                            <Link to={Screen.AddQuestion}>
                                <button
                                    className="outline-none focus:outline-none text-white border-b-3px px-8 transition duration-300 py-2 flex border-1.6px border-primaryColor rounded-full items-center text-lg"
                                    type="button"
                                >
                                    Thêm câu hỏi
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <MenuBarBottom />
        </DefaultLayout>
    );
};
