import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IClassrooms } from 'src/domain/classrooms';
import { Screen } from 'src/view/routes/Router';

type IProps = {
    classroom: IClassrooms;
};

export const CardClassroom: FC<IProps> = ({ classroom }) => {
    return (
        <Link to={`${Screen.Classrooms}/${classroom.nameClass}`}>
            <button
                className="border-2 w-48 border-b-4 border-darkGray focus:outline-none cursor-pointer relative rounded-xl flex items-center justify-center px-6 py-6"
                key={classroom.id}
            >
                <div className="flex flex-col gap-4">
                    <img
                        src={classroom.imageClass}
                        className="border-4 border-white rounded-xl"
                        alt=""
                    />
                    <h1 className=" text-white text-2xl">
                        {`Toán lớp ${classroom.nameClass}`}
                    </h1>
                </div>
            </button>
        </Link>
    );
};
