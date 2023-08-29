/**
 * Вернуться на верх
 */

import { getElementsByData } from '@/_utils'

const backTop = () => {
  const { 'back-top': button } = getElementsByData('el')

  const showButton = () => {
    const minScrollHeight = 500

    if (window.scrollY > minScrollHeight) {
      button.hidden = window.scrollY <= 0
    } else {
      button.hidden = true
    }
  }

  showButton()

  window.addEventListener('scroll', () => {
    showButton()
  })
  button.addEventListener('click', evt => {
    evt.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}

export default backTop
