import React, { FC } from 'react';
import { CommingSoon } from 'src/view/components/CommingSoon';
import { Theme2 } from 'src/view/layout/components/Theme2';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { Header } from 'src/view/layout/Header';

export const AddQuestion: FC = () => {
    return (
        <DefaultLayout>
            <Theme2 />
            <div className="h-screen relative">
                <Header />
                <CommingSoon />
            </div>
        </DefaultLayout>
    );
};
