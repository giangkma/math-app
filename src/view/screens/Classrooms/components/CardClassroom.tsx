import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Classrooms } from 'src/domain/classrooms';
import { Screen } from 'src/view/routes/Router';
import styles from './CardClassroom.module.css';

type IProps = {
    classroom: Classrooms;
};

export const CardClassroom: FC<IProps> = ({ classroom }) => {
    return (
        <Link to={`${Screen.Classrooms}/${classroom.nameClass}`}>
            <button
                className={`${styles.cardClassroom} border-2 border-b-4 border-darkGray focus:outline-none cursor-pointer relative rounded-xl flex items-center justify-center sm:p-3 p-2`}
                key={classroom.id}
            >
                <div className="flex flex-col gap-4 ">
                    <img
                        src={classroom.imageClass}
                        className="border-4 border-white rounded-xl"
                        alt=""
                    />
                    <h1 className=" text-white md:text-lg text-base">
                        {`Toán lớp ${classroom.nameClass}`}
                    </h1>
                </div>
            </button>
        </Link>
    );
};
