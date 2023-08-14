/**
 * Темный режим
 */
import { getElementsByData } from '@/_utils'

const darkMode = () => {
  const { 'dark-mode': darkModeToggles, 'dark-mode-icon': darkModeIcons, likely } = getElementsByData('el')
  const schemeSystem = window.matchMedia('(prefers-color-scheme: dark)')
  let mode = localStorage.getItem('color-scheme')

  // Проверка цветового режима
  const isDarkMode = () => document.documentElement.classList.contains('dark-mode')

  // Смена иконки переключения режима
  const changeIcon = () => {
    darkModeIcons.forEach(icon => {
      if (isDarkMode()) {
        icon.firstElementChild.setAttribute('xlink:href', '#icon-sun')
      } else {
        icon.firstElementChild.setAttribute('xlink:href', '#icon-moon')
      }
    })
  }

  // Сброс темы
  const rebootScheme = () => {
    document.documentElement.classList.remove('dark-mode')
    if (likely) likely.classList.remove('likely-dark-theme')
  }

  // Меняет цветовую схему
  const changeColorScheme = isSchemeSystemDark => {
    // Сброс по умолчанию
    rebootScheme()

    // Темная тема - ОС или выбранный режим на сайте
    if (isSchemeSystemDark || mode === 'dark') {
      document.documentElement.classList.add('dark-mode')
      if (likely) likely.classList.add('likely-dark-theme')
    }

    // Светлая тема - выбранный режим на сайте
    if (mode === 'light') {
      rebootScheme()
    }

    changeIcon()
  }

  // Меняет цветовую схему при загрузке сайта
  changeColorScheme(schemeSystem.matches)

  // Меняет цветовую схему при изменении цветовой схемы ОС
  schemeSystem.addEventListener('change', evt => {
    changeColorScheme(evt.matches)
  })

  // Переключение цветового режима
  darkModeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      mode = isDarkMode() ? 'light' : 'dark'

      localStorage.setItem('color-scheme', mode)
      changeColorScheme(!isDarkMode())
    })
  })
}

export default darkMode
