import React, { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
    HomeActiveIconSVG,
    HomeInActiveIconSVG,
    MessageActiveIconSVG,
    MessageInActiveIconSVG,
    PersonActiveIconSVG,
    PersonInActiveIconSVG,
    RanksActiveIconSVG,
    RanksInActiveIconSVG,
} from 'src/assets/svg';
import { Screen } from 'src/view/routes/Router';

interface Props {
    active?: boolean;
    icon: any;
    iconActive: any;
    label?: string;
    to?: string;
}

export const TabBarItem: FC<Props> = ({
    active,
    icon: Icon,
    iconActive: IconActive,
    label,
    to = '#',
}) => (
    <Link to={to}>
        <div className="col-span-3 flex items-center justify-center flex-col">
            {active ? (
                <IconActive className="sm:w-12 sm:h-12 w-10 h-10" />
            ) : (
                <Icon className="sm:w-12 sm:h-12 w-10 h-10" />
            )}
            <div
                className={`text-xs leading-14px ${
                    active ? 'text-white' : 'text-gray-600'
                }`}
            >
                {label}
            </div>
        </div>
    </Link>
);

export const MenuBarBottom: FC = () => {
    const isClasroomsPage = useRouteMatch(Screen.Classrooms);
    const isRanksPage = useRouteMatch(Screen.Ranks);
    const isMessagePage = useRouteMatch(Screen.Message);
    const isAccountPage = useRouteMatch(Screen.Account);

    return (
        <div className="flex gap-6 w-full border-t-2 border-gray-800">
            <TabBarItem
                to={Screen.Classrooms}
                active={!!isClasroomsPage}
                icon={HomeInActiveIconSVG}
                iconActive={HomeActiveIconSVG}
                label="Lớp học"
            />
            <TabBarItem
                to={Screen.Message}
                active={!!isMessagePage}
                label="Trò chuyện"
                icon={MessageInActiveIconSVG}
                iconActive={MessageActiveIconSVG}
            />
            <TabBarItem
                to={Screen.Ranks}
                active={!!isRanksPage}
                label="Xếp hạng"
                icon={RanksInActiveIconSVG}
                iconActive={RanksActiveIconSVG}
            />
            <TabBarItem
                active={!!isAccountPage}
                to={Screen.Account}
                label="Cá nhân"
                icon={PersonInActiveIconSVG}
                iconActive={PersonActiveIconSVG}
            />
        </div>
    );
};
