import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    active?: boolean;
    icon: string;
    label: string;
    to?: string;
}

const TabBarItem: FC<Props> = ({
    active,
    icon,
    label,
    to = '/coming-soon',
}) => (
    <Link to={to}>
        <div className="col-span-3 flex items-center justify-center flex-col">
            <img alt="" className="mb-6px" src={icon} />
            <div
                className={`text-xs leading-14px ${
                    active ? 'text-orange-sea-buckthorn' : 'text-grey-silver'
                }`}
            >
                {label}
            </div>
        </div>
    </Link>
);

export const MenuBarBottom: FC = () => {
    return (
        <div className="fixed bottom-0 z-1001 h-54px grid grid-cols-12 w-screen bg-white border-t-1 border-white-1">
            <TabBarItem
                active
                icon="src/assets/svg/home-active.svg"
                label="Home"
            />
            <TabBarItem
                icon="src/assets/svg/message-inactive.svg"
                label="Message"
            />
            <TabBarItem
                icon="src/assets/svg/shopping-cart-inactive.svg"
                to="/shopping-cart"
                label="Message"
            />
            <TabBarItem
                icon="src/assets/svg/account-inactive.svg"
                label="My Account"
            />
        </div>
    );
};
