/**
 * Декоративный элемент шара на главной странице
 */

import { getElementsByData } from '@/utils'

const homeBg = () => {
  const { shape } = getElementsByData('el')

  window.addEventListener('scroll', () => {
    const baseOffsetTop = 80
    const shapeHeight = shape.clientHeight < 500 ? 200 : shape.clientHeight

    const offsetToScroll = window.scrollY - shapeHeight / 1.5

    shape.style.top = `${Math.max(baseOffsetTop, offsetToScroll)}px`
  })
}

export default homeBg
