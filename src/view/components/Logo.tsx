import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Screen } from '../routes/Router';

export const Logo: FC = () => {
    return (
        <Link to={Screen.Home}>
            <h1 className="md:text-3xl sm:text-2xl text-xl cursor-pointer text-white font-bold">
                Math Quiz
            </h1>
        </Link>
    );
};
