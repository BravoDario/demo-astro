//Carrusel para imagenes de forma horizontal
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import "../home/Carousel.css";

import images from "../../data/images";
import { useEffect, useState } from "react";

const ImagesCarrousel = ({ handleOpenModal, handleCLoseModal }) => {
    const token = localStorage.getItem("token");
    console.log(token);
    const [isLogin, setIsLogin] = useState(token ? true : false);

    useEffect(() => {
        setIsLogin(token ? true : false);
        !isLogin ? (window.location.href = "/") : "";
    }, [token]);

    return isLogin ? (
        <Swiper
            cssMode={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
            slidesPerView={2}
            spaceBetween={20}
            centeredSlides={true}
            initialSlide={0}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            loop={true}
        >
            {images?.map((img, index) => (
                <SwiperSlide key={index}>
                    <button
                        key={index}
                        className="flex flex-col gap-2 items-center text-center font-thin conference-card rounded-md my-2 h-fit py-4 px-6 md:px-2"
                        onClick={() => handleOpenModal(img)}
                    >
                        <div className="w-80 h-80 overflow-hidden ">
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover object-top"
                                loading="eager"
                            />
                        </div>
                    </button>
                </SwiperSlide>
            ))}
        </Swiper>
    ) : (
        ""
    );
};

export default ImagesCarrousel;
