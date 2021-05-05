import React, { FC } from 'react';

interface Props {
    size?: string;
    loading: boolean;
    classNameContainer?: string;
    title?: string;
    sizeAnimation?: string;
}

export const LoadingCircle: FC<Props> = ({
    size = '15px',
    loading,
    classNameContainer, // loading global : 'fixed top-0 left-0 bg-black bg-opacity-75'
    title,
    sizeAnimation = 'small', // small or big
}) => {
    return (
        <>
            {loading && (
                <div
                    className={`${classNameContainer} w-full h-full flex items-center flex-col justify-center`}
                >
                    <div
                        style={{ width: size, height: size }}
                        className={`animate-blur-${sizeAnimation} bg-peachOrange rounded-full ${title &&
                            'mb-4'}`}
                    ></div>
                    {title && (
                        <div>
                            <p className="absolute top-1/2 transform -translate-x-1/2 text-center text-peachOrange">
                                {title}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
