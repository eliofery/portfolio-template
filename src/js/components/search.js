/**
 * Поиск по сайту
 */

import { debounce, getElementsByData } from '@/utils'
import searchItems from '@/../pug/data/searchItems.json'

const search = () => {
  const { 'search-input': searchInputs, 'search-result': searchResults } = getElementsByData('el')
  const articles = searchItems.items

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
    const link = document.createElement('a')

    link.classList.add('navigation__search-link')
    link.href = result.link
    link.title = result.title
    link.innerHTML = result.title

    searchResults.appendChild(link)
  }

  // Отобразить не успешный результат поиска
  const displayResultNotFound = () => {
    const span = document.createElement('span')

    span.classList.add('navigation__search-link')
    span.innerHTML = 'Ни чего не найдено'

    searchResults.appendChild(span)
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

    searchResults.innerHTML = ''

    if (result.length > 0 && str) {
      result.forEach(res => displayResult(res))
    } else if (str) {
      displayResultNotFound()
    } else {
      searchResults.innerHTML = ''
    }
  }

  // Ввод искомого слова
  searchInputs.addEventListener('input', debounce(onSearch))
}

export default search
