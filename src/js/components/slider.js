/**
 * Слайдшоу на главной
 */

import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'

const swiper = () => {
  const container = document.querySelector('.main-slider__container')
  const wrapper = document.querySelector('.main-slider__wrap')

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

  const onResize = () => {
    const windowScreen = window.innerWidth
    const containerGrid = 20 // размер отступа, этот же размер прописан в _variables.scss
    const containerParams = {
      small: {
        size: 767,
        padding: containerGrid * 2,
      },
      medium: {
        size: 1179,
        padding: containerGrid * 2 * 2,
      },
      // todo удалить
      large: {
        size: 1699,
        padding: containerGrid * 3 * 2, // 3 - такой множитель в .container.scss, 2 - берем левый и правый padding
      },
    }
    const scrollWidth = 20

    const calculateWrapWidth = ({ padding }) =>
      `${container.clientWidth - padding + padding / 2 + (windowScreen - scrollWidth - container.clientWidth) / 2}px`

    if (windowScreen <= containerParams.large.size && windowScreen > containerParams.medium.size) {
      wrapper.style.width = calculateWrapWidth(containerParams.large)
    } else {
      wrapper.removeAttribute('style')
    }

    // todo удалить
    // else if (windowScreen <= containerParams.medium.size && windowScreen > containerParams.small.size) {
    //   wrapper.style.width = calculateWrapWidth(containerParams.medium)
    // }
    // else if (windowScreen <= containerParams.small.size) {
    //   wrapper.style.width = calculateWrapWidth(containerParams.small)
    // } else {
    //   wrapper.removeAttribute('style')
    // }
  }

  const resize = () => onResize()

  resize()
  window.addEventListener('resize', onResize)
}

export default swiper
