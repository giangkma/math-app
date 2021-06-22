import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { WarningWhiteIconSVG } from 'src/assets/svg';
import { UserRole } from 'src/domain/user';
import { dataChapters } from 'src/utils/dummy';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { useRoleUserAuthenticated } from 'src/view/hooks/role';
import { Theme2 } from 'src/view/layout/components/Theme2';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { HeaderBack } from 'src/view/layout/HeaderBack';
import { Screen } from 'src/view/routes/Router';

type IProps = {};

type ParamType = {
    className: string;
};

export const ChapterList: FC<IProps> = () => {
    const isTeacher = useRoleUserAuthenticated(UserRole.teacher);
    const isStudent = useRoleUserAuthenticated(UserRole.student);

    const { className } = useParams<ParamType>();
    const chapters = dataChapters[Number(className) - 1];

    return (
        <DefaultLayout title={`Toán học lớp ${className}`}>
            <Theme2 />
            <div className="h-screen relative overflow-y-auto">
                <HeaderBack to={Screen.Classrooms} title={`Lớp ${className}`} />
                {isTeacher && (
                    <div className="absolute top-0 right-0 m-4">
                        <Link
                            to={`${Screen.Classrooms}/${className}/add-questions`}
                        >
                            <PrimaryButton
                                color="green"
                                className="sm:px-5 sm:py-2 px-4 py-1"
                                title="Thêm câu hỏi"
                            />
                        </Link>
                    </div>
                )}
                <div className="w-full sm:h-full flex flex-col items-center justify-center sm:my-0 my-6">
                    {isStudent && (
                        <h1 className="text-center z-20 w-full sm:mb-12 mb-4 text-white lg:text-3xl md:text-2xl text-xl">
                            Tôi muốn học . . .
                        </h1>
                    )}
                    <div className="flex gap-6 flex-wrap justify-center items-stretch sm:px-8 px-4">
                        {chapters.map(chapter => {
                            return (
                                <Link
                                    key={chapter.id}
                                    to={`${Screen.Classrooms}/${className}/${chapter.id}`}
                                >
                                    <button
                                        className={`w-48 hover:bg-white hover:bg-opacity-25 transition duration-300 border-2 h-full border-b-4 border-darkGray focus:outline-none cursor-pointer relative rounded-xl flex items-center justify-center xs:px-6 md:py-6 p-3`}
                                    >
                                        <div className="flex flex-col gap-4 ">
                                            <div className="border-2 text-xl sm:py-3 py-2 border-white text-white rounded-xl">
                                                Chương {chapter.id}
                                            </div>
                                            <p className=" text-white md:text-lg text-base">
                                                {chapter.name}
                                            </p>
                                        </div>
                                    </button>
                                </Link>
                            );
                        })}
                    </div>
                    {isStudent && (
                        <div className="w-full z-10 sm:pb-0 pb-40">
                            <div className="mt-5 flex items-center justify-center">
                                <WarningWhiteIconSVG className="sm:block hidden" />
                                <p className=" text-white text-base ml-1 text-center">
                                    <span>
                                        Lưu ý : Xếp hạng sẽ chỉ dựa vào kết quả
                                        phần
                                    </span>
                                    <span className="text-xl sm:inline block">
                                        &nbsp;" Ôn luyện cuối năm "
                                    </span>
                                </p>
                            </div>
                            <div>
                                <Link
                                    to={`${Screen.Classrooms}/${className}/all`}
                                >
                                    <button
                                        className="outline-none focus:outline-none text-white hover:bg-white hover:bg-opacity-25 border-b-3px px-8 mt-8 transition duration-300 py-2 flex border-1.6px border-primaryColor rounded-full mx-auto items-center md:text-2xl sm:text-xl text-lg"
                                        type="button"
                                    >
                                        Ôn luyện cuối năm
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
};
