import { config } from '@react-spring/core';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import React, { FC } from 'react';

export const DefaultLayout: FC = ({ children }) => {
    return (
        <Parallax pages={1} config={config.slow}>
            <ParallaxLayer
                id="page-1"
                offset={0}
                speed={0}
                style={{ background: 'linear-gradient(black, Indigo)' }}
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
    );
};
