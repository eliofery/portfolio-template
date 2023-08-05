/**
 * Главная навигация
 */
import { getElementsByData } from '@/utils'

const navigation = () => {
  const {
    'nav-wrap': nav,
    'nav-toggle-open': openToggle,
    'nav-toggle-close': closeToggle,
    'nav-toggle-sub': subToggles,
    'nav-toggle-back': backToggles,
    'nav-overlay': overlay,
  } = getElementsByData('el')

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
          const activeSubMenus = document.querySelectorAll(
            '.navigation__sub-list--open',
          )

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

    overlay.setAttribute('hidden', 'true')
    nav.removeAttribute('aria-modal')
    nav.removeAttribute('role')

    window.removeEventListener('keyup', onEscapeNav)
  }

  // Открыть подменю
  const onOpenMenu = evt => {
    evt.target.nextElementSibling.classList.add('navigation__sub-list--open')
  }

  // Закрыть подменю
  const onCloseMenu = evt => {
    evt.target
      .closest('.navigation__sub-list')
      .classList.remove('navigation__sub-list--open')
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
}

export default navigation
