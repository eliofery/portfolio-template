/**
 * Темная тема
 */
import { getElementsByData } from '@/utils'

const darkMode = () => {
  const { 'dark-mode': darkModeToggles, 'dark-mode-icon': darkModeIcons } = getElementsByData('el')
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

  // Меняет цветовую схему
  const changeColorScheme = isSchemeSystemDark => {
    // Сброс по умолчанию
    document.documentElement.classList.remove('dark-mode')

    // Темная тема - ОС или выбранный режим на сайте
    if (isSchemeSystemDark || mode === 'dark') {
      document.documentElement.classList.add('dark-mode')
    }

    // Светлая тема - выбранный режим на сайте
    if (mode === 'light') {
      document.documentElement.classList.remove('dark-mode')
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
