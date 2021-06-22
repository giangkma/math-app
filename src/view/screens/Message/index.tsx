import React, { FC } from 'react';
import { CommingSoon } from 'src/view/components/CommingSoon';
import { MenuBarBottom } from 'src/view/components/menu/MenuBarBottom';
import { Theme2 } from 'src/view/layout/components/Theme2';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { HeaderBack } from 'src/view/layout/HeaderBack';
import { Screen } from 'src/view/routes/Router';

export const Message: FC = () => {
    return (
        <DefaultLayout>
            <Theme2 />
            <div className="h-screen relative">
                <HeaderBack title={`Tin nhắn`} to={Screen.Classrooms} />
                <CommingSoon />
            </div>
            <MenuBarBottom />
        </DefaultLayout>
    );
};
