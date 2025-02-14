import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'
import { rates_eco } from '../../constans_rates.js'
import './Carousel.css'
export default function App({ language }) {
  const preciosEco = rates_eco.rates
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={40}
      centeredSlides={true}
      initialSlide={1}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      }}
      modules={[Pagination]}
      className='mySwiper'
    >
      {preciosEco.map((preEco, index) => (
        <SwiperSlide key={index}>
          <div className='bg-[url("/img/bg_price_piso.webp")] bg-cover h-[650px] md:h-[350px] rounded-xl grid md:grid-cols-2'>
            <div className='flex flex-col'>
              <div className='pt-5 ps-5 text-white'>
                <h3 className='text-4xl font-bold'>
                  {language === 'en' ? preEco.title.en : preEco.title.es}
                </h3>
                <span>
                  {language === 'en' ? preEco?.size?.en : preEco?.size?.es}
                </span>
              </div>
              <div className='h-full relative grid items-end'>
                <div className='clipped-element h-full w-full bottom-0 absolute z-0'></div>
                <div className='text-lg text-white relative z-10 p-5'>
                  {language === 'en'
                    ? preEco.regular_price_title.en
                    : preEco.regular_price_title.es}
                  <h4 className='text-2xl font-bold'>
                    {language === 'en'
                      ? preEco.regular_price.en
                      : preEco.regular_price.es}
                  </h4>
                </div>
              </div>
            </div>
            <div className='p-2 grid place-items-center'>
              <ul className='p-0 m-0'>
                {preEco.items.map((item, itemIndex) => (
                  <li key={itemIndex} className='flex items-start pt-2'>
                    <img src="/img/check-icon.svg" alt="check icon" width={20} height={20} loading="lazy" />
                    <p className='p-0 m-0 text-white text-sm'>
                      {language === 'en'
                        ? item.description.en
                        : item.description.es}
                    </p>
                  </li>
                ))}
              </ul>
              <p className='font-bold p-3 text-white'>
                {language === 'en'
                  ? preEco.not_included.en
                  : preEco.not_included.es}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
