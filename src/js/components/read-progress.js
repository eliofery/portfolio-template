/**
 * Прогресс прочитанной статьи
 */

import { getElementsByData } from '@/_utils'

const readProgress = () => {
  const { 'read-progress': progress } = getElementsByData('el')

  const setProgress = () => {
    const maxScreenHeight = document.body.scrollHeight - window.screen.height

    progress.hidden = window.scrollY <= 0
    progress.value = Math.floor((window.scrollY * 100) / maxScreenHeight)
  }

  if (window.scrollY > 0) {
    setProgress()
  }

  window.addEventListener('scroll', () => {
    setProgress()
  })
}

export default readProgress
