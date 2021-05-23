/* eslint-disable jsx-a11y/alt-text */
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'react-spring';
import MatTrangIMG from 'src/assets/images/mattrang.png';
import SaoBangIMG from 'src/assets/images/saobang.png';
import MayBayIMG from 'src/assets/images/maybay.png';
import { CloudIconSVG, EarthIconSVG, Satellite4IconSVG } from 'src/assets/svg';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { Logo } from 'src/view/components/Logo';
import { Screen } from 'src/view/routes/Router';
import { PageTransittion } from 'src/view/components/PageTransittion';

const Decoration = () => (
    <React.Fragment>
        <ParallaxLayer
            offset={2}
            speed={-0.5}
            style={{ pointerEvents: 'none' }}
        >
            <Satellite4IconSVG style={{ width: '15%', marginLeft: '70%' }} />
        </ParallaxLayer>
        <ParallaxLayer offset={0.15} speed={0.4} style={{ opacity: 0.9 }}>
            <img src={MatTrangIMG} style={{ marginLeft: '20%' }} alt="" />
        </ParallaxLayer>
        <ParallaxLayer offset={0.45} speed={0.3} style={{ opacity: 0.9 }}>
            <img src={SaoBangIMG} style={{ marginLeft: '70%' }} alt="" />
        </ParallaxLayer>
        <ParallaxLayer offset={0.25} speed={0.3} style={{ opacity: 1 }}>
            <img
                src={MayBayIMG}
                style={{ marginLeft: '40%' }}
                className="md:w-40 w-32"
                alt=""
            />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.8} style={{ opacity: 0.1 }}>
            <CloudIconSVG
                style={{ display: 'block', width: '20%', marginLeft: '55%' }}
            />
            <CloudIconSVG
                style={{ display: 'block', width: '10%', marginLeft: '5%' }}
            />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.2} style={{ opacity: 0.2 }}>
            <CloudIconSVG
                style={{ display: 'block', width: '10%', marginLeft: '40%' }}
            />
            <CloudIconSVG
                style={{ display: 'block', width: '10%', marginLeft: '85%' }}
            />
        </ParallaxLayer>
        <ParallaxLayer offset={0.75} speed={0.5} style={{ opacity: 0.1 }}>
            <CloudIconSVG
                style={{ display: 'block', width: '20%', marginLeft: '30%' }}
            />
            <CloudIconSVG
                style={{ display: 'block', width: '20%', marginLeft: '40%' }}
            />
        </ParallaxLayer>
        <ParallaxLayer offset={1.6} speed={0.3} style={{ opacity: 0.9 }}>
            <img src={SaoBangIMG} style={{ marginLeft: '10%' }} alt="" />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <CloudIconSVG
                style={{ display: 'block', width: '20%', marginLeft: '55%' }}
            />
            <CloudIconSVG
                style={{ display: 'block', width: '10%', marginLeft: '15%' }}
            />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <CloudIconSVG
                style={{ display: 'block', width: '20%', marginLeft: '70%' }}
            />
            <CloudIconSVG
                style={{ display: 'block', width: '20%', marginLeft: '40%' }}
            />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <CloudIconSVG
                style={{ display: 'block', width: '10%', marginLeft: '10%' }}
            />
            <CloudIconSVG
                style={{ display: 'block', width: '20%', marginLeft: '75%' }}
            />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <CloudIconSVG
                style={{ display: 'block', width: '20%', marginLeft: '60%' }}
            />
            <CloudIconSVG
                style={{ display: 'block', width: '25%', marginLeft: '30%' }}
            />
            <CloudIconSVG
                style={{ display: 'block', width: '10%', marginLeft: '80%' }}
            />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <CloudIconSVG
                style={{ display: 'block', width: '20%', marginLeft: '5%' }}
            />
            <CloudIconSVG
                style={{ display: 'block', width: '15%', marginLeft: '75%' }}
            />
        </ParallaxLayer>

        <ParallaxLayer
            offset={2.5}
            speed={-0.4}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
            }}
        >
            <EarthIconSVG style={{ width: '60%' }} />
        </ParallaxLayer>
    </React.Fragment>
);

type IProps = {};

export const Home: FC<IProps> = () => {
    return (
        <PageTransittion>
            <Parallax pages={5} config={config.slow}>
                <ParallaxLayer
                    id="page-1"
                    offset={0}
                    speed={0}
                    style={{ background: 'linear-gradient(black, Indigo)' }}
                />
                <ParallaxLayer
                    id="page-2"
                    offset={1}
                    speed={0}
                    style={{
                        background: 'linear-gradient(Indigo, DeepSkyBlue)',
                    }}
                />
                <ParallaxLayer
                    id="page-3"
                    offset={2}
                    speed={0}
                    style={{
                        background: 'linear-gradient(DeepSkyBlue, yellow)',
                    }}
                />
                <ParallaxLayer
                    id="page-4"
                    offset={3}
                    speed={0}
                    style={{
                        background: 'linear-gradient(yellow, ForestGreen)',
                    }}
                />
                <ParallaxLayer
                    id="page-5"
                    offset={4}
                    speed={0}
                    style={{
                        background: 'linear-gradient(ForestGreen, SaddleBrown)',
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

                <Decoration />

                <ParallaxLayer
                    offset={0}
                    speed={-0.3}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <div className="text-center px-8">
                        <h1 className="md:text-4xl text-2xl text-white">
                            Học Toán Trực Tuyến Dành Cho Học Sinh
                        </h1>
                        <h2 className="md:text-5xl text-3xl text-white mt-4">
                            Tiểu Học Cơ Sở
                        </h2>
                        <div className="">
                            <Link to={Screen.Login}>
                                <PrimaryButton
                                    title="Bắt đầu"
                                    className="px-8 mt-6 py-2"
                                    color="green"
                                />
                            </Link>
                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={1}
                    speed={-0.3}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className="text-center px-8">
                        <h1 className="md:text-4xl text-2xl text-white">
                            Học Toán Trực Tuyến Dành Cho Học Sinh
                        </h1>
                        <h2 className="md:text-5xl text-3xl text-white mt-4">
                            Tiểu Học Cơ Sở
                        </h2>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2}
                    speed={-0.3}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className="text-center px-8">
                        <h1 className="md:text-4xl text-2xl text-white">
                            Học Toán Trực Tuyến Dành Cho Học Sinh
                        </h1>
                        <h2 className="md:text-5xl text-3xl text-white mt-4">
                            Tiểu Học Cơ Sở
                        </h2>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={3}
                    speed={-0.3}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className="text-center px-8">
                        <h1 className="md:text-4xl text-2xl text-white">
                            Học Toán Trực Tuyến Dành Cho Học Sinh
                        </h1>
                        <h2 className="md:text-5xl text-3xl text-white mt-4">
                            Tiểu Học Cơ Sở
                        </h2>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={4}
                    speed={-0.3}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: `url(https://awv3node-homepage.surge.sh/build/assets/stars.svg)`,
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="flex flex-col text-center">
                        <h1 className="md:text-4xl sm:text-3xl text-2xl text-white">
                            Hãy bắt đầu học ngay nào ...
                        </h1>
                        <Link to={Screen.Login}>
                            <PrimaryButton
                                className="px-6 py-3 mt-6 md:text-2xl text-xl"
                                title="Bắt đầu"
                                color="green"
                            />
                        </Link>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </PageTransittion>
    );
};
