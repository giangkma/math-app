import React, { FC } from 'react';
import { CommingSoon } from 'src/view/components/CommingSoon';
import { MenuBarBottom } from 'src/view/components/menu/MenuBarBottom';
import { PageTransittion } from 'src/view/components/PageTransittion';
import { Theme3 } from 'src/view/layout/components/Theme3';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { Header } from 'src/view/layout/Header';

export const Account: FC = () => {
    return (
        <DefaultLayout>
            <Theme3 />
            <div className="h-screen relative">
                <Header />
                <PageTransittion>
                    <CommingSoon />
                </PageTransittion>
            </div>
            <MenuBarBottom />
        </DefaultLayout>
    );
};
