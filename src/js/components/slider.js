/**
 * Слайдшоу на главной
 */

import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

const swiper = () => {
  new Swiper('.main-slider__list', {
    modules: [Navigation, Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: '1',
    spaceBetween: 20,
    breakpoints: {
      600: {
        slidesPerView: '1.2',
      },
      768: {
        slidesPerView: '2.2',
      },
      1180: {
        slidesPerView: '2.5',
        spaceBetween: 30,
      },
    },
  })
}

export default swiper
