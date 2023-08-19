/**
 * Декоративный элемент шара на главной странице
 */

import { getElementsByData } from '@/_utils'

const shape = () => {
  const { shape: shapeItem } = getElementsByData('el')

  window.addEventListener('scroll', () => {
    const baseOffsetTop = 80
    const shapeHeight = shapeItem.clientHeight < 500 ? 200 : shapeItem.clientHeight

    const offsetToScroll = window.scrollY - shapeHeight / 1.5

    shapeItem.style.top = `${Math.max(baseOffsetTop, offsetToScroll)}px`
  })
}

export default shape
