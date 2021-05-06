import { ParallaxLayer } from '@react-spring/parallax';
import React, { FC } from 'react';
import { CloudIconSVG, Satellite4IconSVG } from 'src/assets/svg';
import MatTrangIMG from 'src/assets/images/mattrang.png';

export const Theme1: FC = () => {
    return (
        <>
            <ParallaxLayer offset={0.15} speed={1} style={{ opacity: 0.9 }}>
                <img src={MatTrangIMG} style={{ marginLeft: '15%' }} alt="" />
            </ParallaxLayer>
            <ParallaxLayer
                offset={0.5}
                speed={-0.5}
                style={{ pointerEvents: 'none', opacity: 0.7 }}
            >
                <Satellite4IconSVG
                    style={{ width: '15%', marginLeft: '70%' }}
                />
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={0.8} style={{ opacity: 0.1 }}>
                <CloudIconSVG
                    style={{
                        display: 'block',
                        width: '20%',
                        marginLeft: '55%',
                    }}
                />
                <CloudIconSVG
                    style={{ display: 'block', width: '10%', marginLeft: '5%' }}
                />
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={0.2} style={{ opacity: 0.2 }}>
                <CloudIconSVG
                    style={{
                        display: 'block',
                        width: '10%',
                        marginLeft: '40%',
                    }}
                />
                <CloudIconSVG
                    style={{
                        display: 'block',
                        width: '10%',
                        marginLeft: '85%',
                    }}
                />
            </ParallaxLayer>
            <ParallaxLayer offset={0.75} speed={0.5} style={{ opacity: 0.1 }}>
                <CloudIconSVG
                    style={{
                        display: 'block',
                        width: '20%',
                        marginLeft: '30%',
                    }}
                />
                <CloudIconSVG
                    style={{
                        display: 'block',
                        width: '20%',
                        marginLeft: '40%',
                    }}
                />
            </ParallaxLayer>
        </>
    );
};
