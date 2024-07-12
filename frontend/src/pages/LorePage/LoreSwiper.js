import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const LoreSwiper = ({ images, activeIndex, setActiveIndex }) => {
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        if (swiper !== null) {
            swiper.on('slideChange', () => {
                setActiveIndex(swiper.realIndex);
            });
        }
    }, [swiper, setActiveIndex]);

    const handlePrev = () => {
        if (swiper !== null) {
            swiper.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiper !== null) {
            swiper.slideNext();
        }
    };

    const clickOnImage = () => {
        if (swiper !== null) {
            swiper.slideNext();
        }
    };

    return (
        <div className="lore-images">
            <div className="arrow-container left">
                <div className="arrow-icon prev" onClick={handlePrev}>
                    <FontAwesomeIcon icon={faChevronLeft} color="#ffbf67" size="3x" />
                </div>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                centeredSlides={false}
                loop={true}
                slidesPerGroup={1}
                onSwiper={setSwiper}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className={`lore-image ${activeIndex === index ? 'active' : ''}`} onClick={() => clickOnImage(index)}>
                        <img src={image} alt={`Lore Image ${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="arrow-container right">
                <div className="arrow-icon next" onClick={handleNext}>
                    <FontAwesomeIcon icon={faChevronRight} color="#ffbf67" size="3x" />
                </div>
            </div>
        </div>
    );
};

export default LoreSwiper;