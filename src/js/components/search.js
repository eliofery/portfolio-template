/**
 * Поиск по сайту
 */

import { debounce, getElementsByData } from '@/utils'
import searchItems from '@/../pug/data/searchItems.json'

const search = () => {
  const {
    search: searchModal,
    'search-input': searchInput,
    'search-result': searchResult,
    'search-open': searchOpenToggles,
    'search-close': searchCloseToggle,
  } = getElementsByData('el')
  const articles = searchItems.items

  // Закрыть поиск по нажатию ESC
  const onEscape = evt => {
    if (evt.key === 'Escape') {
      searchCloseToggle.click()
    }
  }

  // Открыть поиск
  const onOpen = () => {
    searchModal.removeAttribute('hidden')
    searchInput.focus()

    window.addEventListener('keyup', onEscape)
  }

  // Закрыть поиск
  const onClose = evt => {
    if (evt.target.dataset.el === 'search' || evt.target.dataset.el === 'search-close') {
      searchModal.hidden = true

      window.removeEventListener('keyup', onEscape)
    }
  }

  // Проверка вхождения некоторых символов
  const checkName = (name, str) => {
    const pattern = str
      .split('')
      .map(x => `(?=.*${x})`)
      .join('')
    const regex = new RegExp(pattern, 'g')

    return name.match(regex)
  }

  // Отобразить успешный результат поиска
  const displayResult = result => {
    const markup = `<a class="modal-search__item" href="${result.link}" title="${result.title}">
        <div class="modal-search__item-wrap">${result.title}</div>
    </a>`

    searchResult.insertAdjacentHTML('afterbegin', markup)
  }

  // Отобразить не успешный результат поиска
  const displayResultNotFound = () => {
    const markup = `<div class="modal-search__item modal-search__item--not-found">
        <div class="modal-search__item-wrap">Ни чего не найдено</div>
    </div>`

    searchResult.insertAdjacentHTML('afterbegin', markup)
  }

  // Отобразить текст по умолчанию
  const displayResultDefault = () => {
    const markup = `<div class="modal-search__item modal-search__item--not-found">
        <div class="modal-search__item-wrap">Введите ваш запрос</div>
    </div>`

    searchResult.insertAdjacentHTML('afterbegin', markup)
  }

  // Обработчик поиска
  const onSearch = evt => {
    const str = evt.target.value.toLowerCase()

    const result = articles.filter(article => {
      const title = article.title.toLowerCase()
      const desc = article.desc.toLowerCase()
      const letterTitle = title.slice(0, 5)
      const letterDesc = desc.slice(0, 5)

      return title.includes(str) || desc.includes(str) || checkName(letterTitle, str) || checkName(letterDesc, str)
    })

    searchResult.innerHTML = ''

    if (result.length > 0 && str) {
      result.forEach(res => displayResult(res))
    } else if (str) {
      displayResultNotFound()
    } else {
      displayResultDefault()
    }
  }

  // Ввод искомого слова
  searchInput.addEventListener('input', debounce(onSearch))

  searchOpenToggles.forEach(toggle => {
    toggle.addEventListener('click', onOpen)
  })

  searchModal.addEventListener('click', onClose)
  searchCloseToggle.addEventListener('click', onClose)
}

export default search
