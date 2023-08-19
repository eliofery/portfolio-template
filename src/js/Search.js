// eslint-disable-next-line no-unused-vars
class Search {
  constructor(articles = {}) {
    const elements = this._getElementsByData('el')

    this.articles = JSON.parse(articles)
    this.searchModal = elements.search
    this.searchInput = elements['search-input']
    this.searchResult = elements['search-result']
    this.searchOpenToggles = elements['search-open']
    this.searchCloseToggle = elements['search-close']

    // Ввод искомого слова
    this.searchInput.addEventListener('input', this._debounce(this._onSearch))

    this.searchOpenToggles.forEach(toggle => {
      toggle.addEventListener('click', this._onOpen.bind(this))
    })

    this.searchModal.addEventListener('click', this._onClose.bind(this))
    this.searchCloseToggle.addEventListener('click', this._onClose.bind(this))
  }

  // Закрыть поиск по нажатию ESC
  _onEscape(evt) {
    if (evt.key === 'Escape') {
      this.searchCloseToggle.click()
    }
  }

  // Открыть поиск
  _onOpen() {
    this.searchModal.removeAttribute('hidden')
    this.searchInput.focus()

    window.addEventListener('keyup', this._onEscape.bind(this))
  }

  // Закрыть поиск
  _onClose(evt) {
    if (evt.target.dataset.el === 'search' || evt.target.dataset.el === 'search-close') {
      this.searchModal.hidden = true

      window.removeEventListener('keyup', this._onEscape.bind(this))
    }
  }

  // Отобразить успешный результат поиска
  _displayResult(result) {
    const markup = `<a class="modal-search__item" href="${result.url}" title="${result.title}">
        <div class="modal-search__item-wrap">${result.title}</div>
    </a>`

    this.searchResult.insertAdjacentHTML('afterbegin', markup)
  }

  // Отобразить не успешный результат поиска
  _displayResultNotFound() {
    const markup = `<div class="modal-search__item modal-search__item--not-found">
        <div class="modal-search__item-wrap">Ни чего не найдено</div>
    </div>`

    this.searchResult.insertAdjacentHTML('afterbegin', markup)
  }

  // Отобразить текст по умолчанию
  _displayResultDefault() {
    const markup = `<div class="modal-search__item modal-search__item--not-found">
        <div class="modal-search__item-wrap">Введите ваш запрос</div>
    </div>`

    this.searchResult.insertAdjacentHTML('afterbegin', markup)
  }

  // Обработчик поиска
  _onSearch(evt) {
    const input = evt.target.value.toLowerCase()

    const result = this.articles.filter(article => {
      const title = article.title.toLowerCase()
      const desc = article.description.toLowerCase()
      const letterTitle = title.slice(0, 5)
      const letterDesc = desc.slice(0, 5)

      // Проверка вхождения некоторых символов
      const checkName = (name, str) => {
        const pattern = str
          .split('')
          .map(x => `(?=.*${x})`)
          .join('')
        const regex = new RegExp(pattern, 'g')

        return name.match(regex)
      }

      return (
        title.includes(input) || desc.includes(input) || checkName(letterTitle, input) || checkName(letterDesc, input)
      )
    })

    this.searchResult.innerHTML = ''

    if (result.length > 0 && input) {
      result.forEach(res => this._displayResult(res))
    } else if (input) {
      this._displayResultNotFound()
    } else {
      this._displayResultDefault()
    }
  }

  _debounce(func, timeout = 300) {
    let timer

    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _getElementsByData(name) {
    const el = {}

    document.querySelectorAll(`[data-${name}]`).forEach(toggle => {
      const key = toggle.dataset[name]

      el[key] = el[key] ? [toggle].concat(el[key]) : toggle
    })

    return el
  }
}
