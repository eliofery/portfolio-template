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
    slidesPerView: '2.5',
    spaceBetween: 30,
  })
}

export default swiper
