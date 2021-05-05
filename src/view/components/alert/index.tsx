import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CloseIconSVG, TickGreenIconSVG, WarningIconSVG } from 'src/assets/svg';

type Props = {
    isSuccess: boolean;
    message: string | undefined;
    clearMessage?: () => void;
    redirectUrl?: string;
};

export const Alert: FC<Props> = ({
    isSuccess,
    message,
    clearMessage,
    redirectUrl,
}) => {
    return (
        <>
            {message && (
                <div
                    className="rounded-full my-4 bg-red-500 px-1 flex justify-between items-center pr-3"
                    role="alert"
                >
                    <div className="flex items-center justify-start">
                        {isSuccess ? <TickGreenIconSVG /> : <WarningIconSVG />}
                        <div className="block sm:inline ml-2 text-woodyBrown">
                            <span>{message}</span>
                            {isSuccess && redirectUrl && (
                                <>
                                    <span>.&nbsp;Klikk&nbsp;</span>
                                    <Link to={redirectUrl ?? ''}>
                                        <span className="underline">her</span>
                                    </Link>
                                    <span>&nbsp;for å lukke vindu.</span>
                                </>
                            )}
                        </div>
                    </div>
                    <button
                        className="focus:outline-none"
                        type="button"
                        onClick={clearMessage}
                    >
                        <CloseIconSVG />
                    </button>
                </div>
            )}
        </>
    );
};
