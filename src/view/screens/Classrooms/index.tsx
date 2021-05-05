import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { IClassrooms } from 'src/domain/classrooms';
import { UserRole } from 'src/domain/user';
import { dataClassrooms } from 'src/utils/dummy';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { useRoleUserAuthenticated } from 'src/view/hooks/role';
import { Header } from 'src/view/layout/Header';
import { Screen } from 'src/view/routes/Router';
import { CardClassroom } from './components/CardClassroom';
import { Ranks } from './components/Ranks';

type IProps = {};

export const Classrooms: FC<IProps> = () => {
    const isTeacher = useRoleUserAuthenticated(UserRole.teacher);

    return (
        <div className="h-screen relative">
            <Header />
            <div className="grid grid-cols-3 mt-8 mx-16 pb-12">
                <div style={{ width: '400px' }} className="mx-auto col-span-2">
                    <div className="flex items-center justify-between gap-8">
                        <CardClassroom classroom={dataClassrooms[0]} />
                        <CardClassroom classroom={dataClassrooms[1]} />
                    </div>
                    <div className="flex items-center justify-center mt-8">
                        <div className="mx-auto">
                            <CardClassroom classroom={dataClassrooms[2]} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-8 gap-8">
                        <CardClassroom classroom={dataClassrooms[3]} />
                        <CardClassroom classroom={dataClassrooms[4]} />
                    </div>
                </div>
                <Ranks />
            </div>
            {isTeacher && (
                <div className="absolute bottom-0 w-full flex justify-center mb-10">
                    <Link to={Screen.Classrooms}>
                        <PrimaryButton color="green" title="Thêm câu hỏi" />
                    </Link>
                </div>
            )}
        </div>
    );
};
