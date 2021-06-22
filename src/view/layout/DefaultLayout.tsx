import { config } from '@react-spring/core';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

type IProps = {
    title?: string;
};

export const DefaultLayout: FC<IProps> = ({ children, title }) => {
    return (
        <div className="default-layout pb-40">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
            </Helmet>
            <Parallax pages={1} config={config.slow}>
                <ParallaxLayer
                    id="page-1"
                    offset={0}
                    speed={0}
                    style={{
                        background: 'linear-gradient(black, Indigo)',
                    }}
                />

                <ParallaxLayer
                    offset={0}
                    speed={0}
                    factor={3}
                    style={{
                        backgroundImage: `url(https://awv3node-homepage.surge.sh/build/assets/stars.svg)`,
                        backgroundSize: 'cover',
                    }}
                />
                {children}
            </Parallax>
        </div>
    );
};
