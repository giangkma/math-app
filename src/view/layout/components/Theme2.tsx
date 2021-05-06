import { ParallaxLayer } from '@react-spring/parallax';
import React, { FC } from 'react';
import { CloudIconSVG, EarthIconSVG } from 'src/assets/svg';
import MatTrangIMG from 'src/assets/images/mattrang.png';

export const Theme2: FC = () => {
    return (
        <>
            <ParallaxLayer offset={0.3} speed={1} style={{ opacity: 0.9 }}>
                <img
                    src={MatTrangIMG}
                    style={{ width: '5%', marginLeft: '5%' }}
                    alt=""
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
                    style={{
                        display: 'block',
                        width: '10%',
                        marginLeft: '15%',
                    }}
                />
            </ParallaxLayer>

            <ParallaxLayer offset={0.75} speed={0.5} style={{ opacity: 0.1 }}>
                <CloudIconSVG
                    style={{
                        display: 'block',
                        width: '20%',
                        marginLeft: '70%',
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

            <ParallaxLayer offset={0} speed={0.2} style={{ opacity: 0.2 }}>
                <CloudIconSVG
                    style={{
                        display: 'block',
                        width: '10%',
                        marginLeft: '10%',
                    }}
                />
                <CloudIconSVG
                    style={{
                        display: 'block',
                        width: '20%',
                        marginLeft: '75%',
                    }}
                />
            </ParallaxLayer>

            <ParallaxLayer offset={0.5} speed={-0.1} style={{ opacity: 0.2 }}>
                <CloudIconSVG
                    style={{
                        display: 'block',
                        width: '20%',
                        marginLeft: '10%',
                    }}
                />
                <CloudIconSVG
                    style={{
                        display: 'block',
                        width: '15%',
                        marginLeft: '20%',
                    }}
                />
                <CloudIconSVG
                    style={{
                        display: 'block',
                        width: '10%',
                        marginLeft: '80%',
                    }}
                />
            </ParallaxLayer>
            <ParallaxLayer
                offset={-0.75}
                speed={-0.4}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    opacity: 0.8,
                    marginLeft: '-15%',
                }}
            >
                <EarthIconSVG style={{ width: '10%' }} />
            </ParallaxLayer>
        </>
    );
};
