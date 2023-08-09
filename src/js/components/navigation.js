/**
 * Главная навигация
 */
import { getElementsByData } from '@/utils'

const navigation = () => {
  const {
    'nav-wrap': nav,
    'nav-content': navContent,
    'nav-toggle-open': openToggle,
    'nav-toggle-close': closeToggle,
    'nav-toggle-sub': subToggles,
    'nav-toggle-back': backToggles,
    'nav-overlay': overlay,
  } = getElementsByData('el')

  const navElements = nav.querySelectorAll('a[href^="#"]')

  // Закрыть меню
  const onEscapeNav = evt => {
    // Основное меню
    if (evt.key === 'Escape') {
      closeToggle.click()
    }

    // Текущее подменю
    if (evt.key === 'Backspace') {
      const currentBackToggle = backToggles
        .filter(toggle => {
          const currentSubMenu = toggle.parentElement.parentElement
          const activeSubMenus = document.querySelectorAll('.navigation__sub-list--open')

          return currentSubMenu === Array.from(activeSubMenus).at(-1)
        })
        .pop()

      if (currentBackToggle) {
        currentBackToggle.click()
      }
    }
  }

  // Открыть меню
  const onOpenNav = () => {
    document.body.style.overflow = 'hidden'
    openToggle.classList.add('menu-toggle--close')
    nav.classList.add('navigation__wrap--active')

    overlay.removeAttribute('hidden')
    nav.setAttribute('aria-modal', 'true')
    nav.setAttribute('role', 'dialog')

    window.addEventListener('keyup', onEscapeNav)
  }

  // Закрыть меню
  const onCloseNav = () => {
    document.body.style.overflow = ''
    openToggle.classList.remove('menu-toggle--close')
    nav.classList.remove('navigation__wrap--active')

    overlay.hidden = true
    nav.removeAttribute('aria-modal')
    nav.removeAttribute('role')

    window.removeEventListener('keyup', onEscapeNav)
  }

  // Открыть подменю
  const onOpenMenu = evt => {
    const subList = evt.target.nextElementSibling

    subList.classList.add('navigation__sub-list--open')
    subList.style.height = `${Math.max(navContent.scrollHeight, subList.clientHeight)}px`
  }

  // Закрыть подменю
  const onCloseMenu = evt => {
    const subList = evt.target.closest('.navigation__sub-list')

    subList.classList.remove('navigation__sub-list--open')
    subList.style.height = 'auto'
  }

  // Изменение ширины экрана
  const onResize = () => {
    const tabletWidth = 1179
    const currentWidth = window.innerWidth

    if (currentWidth > tabletWidth) {
      document.body.style.overflow = ''
      overlay.setAttribute('hidden', 'true')
    } else if (nav.classList.contains('navigation__wrap--active')) {
      document.body.style.overflow = 'hidden'
      overlay.removeAttribute('hidden')
    }
  }

  // Прослушка событий
  openToggle.addEventListener('click', onOpenNav)
  closeToggle.addEventListener('click', onCloseNav)
  subToggles.forEach(toggle => toggle.addEventListener('click', onOpenMenu))
  backToggles.forEach(toggle => toggle.addEventListener('click', onCloseMenu))
  overlay.addEventListener('click', onCloseNav)
  window.addEventListener('resize', onResize)

  navElements.forEach(link => {
    link.addEventListener('click', evt => {
      evt.preventDefault()

      const id = link.getAttribute('href')
      const target = document.querySelector(id)
      const offsetTop = target.getBoundingClientRect().top

      closeToggle.click()

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    })
  })
}

export default navigation
