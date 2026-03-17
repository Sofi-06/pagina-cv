import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';


import 'swiper/css';
import 'swiper/css/pagination';

import './HomeCarousel.css';

import banner1 from '../../assets/1-Bienvenidos-tomasinos-26-1_Banner-plataforma_new.jpg';
import banner2 from '../../assets/Banner-Bienestar-Integral_Web_new.jpg';
import banner3 from '../../assets/4-Mesa-de-ayuda-Soporte-programas-virtuales_Web_New.jpg';
import flechaCampus from '../../assets/flechaCampus-2-01.png';

const HomeCarousel: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <div className="home-carousel-wrapper">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={false}
                preventClicks={false}
                preventClicksPropagation={false}
                className="main-hero-swiper"
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            >
                {/* Slide 1 - Bienvenidos Tomasinos */}
                <SwiperSlide>
                    <div
                        className="carousel-slide"
                        style={{ backgroundImage: `url(${banner1})` }}
                    >
                        <div className="carousel-overlay"></div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 - Banner Bienestar */}
                <SwiperSlide>
                    <a
                        href="https://bienestarintegral.santototunja.co/"
                        target="_blank"
                        rel="noreferrer"
                        className="carousel-slide-link"
                        aria-label="Ir a Bienestar Integral"
                    >
                        <div
                            className="carousel-slide"
                            style={{ backgroundImage: `url(${banner2})` }}
                        >
                            <div className="carousel-overlay"></div>
                        </div>
                    </a>
                </SwiperSlide>

                {/* Slide 3 - Mesa de Ayuda */}
                <SwiperSlide>
                    <a
                        href="https://programasvirtuales.santototunja.edu.co/"
                        target="_blank"
                        rel="noreferrer"
                        className="carousel-slide-link"
                        aria-label="Ir a Programas Virtuales"
                    >
                        <div
                            className="carousel-slide"
                            style={{ backgroundImage: `url(${banner3})` }}
                        >
                            <div className="carousel-overlay"></div>
                        </div>
                    </a>
                </SwiperSlide>
            </Swiper>

            <div className="carousel-pagination" aria-label="Navegacion del carrusel">
                {[0, 1, 2].map((index) => (
                    <button
                        key={index}
                        type="button"
                        className={`carousel-pagination-bullet${activeSlide === index ? ' is-active' : ''}`}
                        aria-label={`Ir a la imagen ${index + 1}`}
                        aria-pressed={activeSlide === index}
                        onClick={() => swiperInstance?.slideToLoop(index)}
                    />
                ))}
            </div>

            {/* Custom SVG Bottom Curve with Arrow */}
            <div className="custom-shape-divider-bottom">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0 Q0,40 40,40 L480,40 C530,40 540,110 600,110 C660,110 670,40 720,40 L1160,40 Q1200,40 1200,0 L1200,120 L0,120 Z" fill="#ffffff"></path>
                </svg>
                <div className="chevron-down-icon">
                    <img src={flechaCampus} alt="Flecha hacia abajo" className="chevron-down-image" />
                </div>
            </div>
        </div>
    );
};

export default HomeCarousel;
