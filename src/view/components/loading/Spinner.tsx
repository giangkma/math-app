import React, { FC } from 'react';
import { SpinnerIconSVG } from 'src/assets/svg';

type Props = {
    color?: string;
    loading: boolean;
    className?: string;
};

export const Spinner: FC<Props> = ({
    color = 'text-white',
    loading,
    className,
}) => {
    return (
        <>
            {loading && (
                <div
                    className={`absolute w-full h-full top-0 left-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center z-50 ${className}`}
                >
                    <SpinnerIconSVG
                        className={`animate-spin -ml-1 mr-3 h-8 w-8 ${color}`}
                    />
                </div>
            )}
        </>
    );
};
