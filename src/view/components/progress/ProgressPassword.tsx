import React from 'react';

interface Props {
    statusProgress: number;
}

export const ProgressPassword: React.FC<Props> = ({ statusProgress }) => {
    return (
        <>
            <div className="grid grid-cols-2 w-full gap-1 mt-3">
                <span
                    className={`h-1 transition duration-150 ${statusProgress ===
                        0 && 'bg-vanillaWhite'} ${statusProgress === 1 &&
                        'bg-errorRed'} ${statusProgress === 2 &&
                        'bg-successGreen'}`}
                />
                <span
                    className={`h-1 transition duration-150  ${
                        statusProgress === 2
                            ? 'bg-successGreen'
                            : 'bg-vanillaWhite'
                    }`}
                />
            </div>
            {statusProgress === 2 && (
                <p className="text-sm text-woodyBrown mt-3">Godkjent passord</p>
            )}
        </>
    );
};
