import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBackIconSVG } from 'src/assets/svg';

type IProps = {
    to: string;
    title: string;
};

export const HeaderBack: FC<IProps> = ({ to, title }) => {
    return (
        <div className="sm:p-6 p-4 flex items-center w-full justify-between relative left-0 top-0">
            <div className="flex items-center">
                <Link to={to}>
                    <ArrowBackIconSVG className="sm:w-10 w-8 cursor-pointer sm:h-10 h-8" />
                </Link>
                <p className="md:text-2xl text-xl z-20 text-white sm:ml-6 ml-3">
                    {title}
                </p>
            </div>
        </div>
    );
};
