/**
 * Конфигурационный файл
 *
 * Содержит пути к каталогам и параметры для тасков
 */

const srcPath = 'src' // ресурсы для разработки проекта
const buildPath = 'build' // готовый продакшен проект

const config = {
  // Файлы в которых производится замена текста
  files: [`${srcPath}/assets/manifest.json`, `${srcPath}/pug/data/config.pug`],

  // Замена текста в файлах указанных выше, укажите в параметре new свое значение
  replacement: {
    // ссылка на сайт, используется для seo
    url: {
      old: 'http://localhost:3000',
      new: 'https://eliofery.github.io/portfolio-template',
    },
    // ссылка используется в теге <base>
    baseUrl: {
      old: '/gulp-template/',
      new: '/portfolio-template/',
    },
    title: {
      old: 'Название проекта',
      new: 'Sergio Eliofery',
    },
    desc: {
      old: 'Описание проекта',
      new: 'Портфолио и блог web разработчика Sergio Eliofery',
    },
    // версия проекта, используется для сброса кеша стилей и скриптов
    version: {
      old: '0.1.8',
      new: '0.0.1',
    },
    // акцентный цвет проекта
    color: {
      old: '#000',
      new: '#ee1b24',
    },
    // google analytics
    google: {
      old: 'GTM-XXXXXX',
      new: 'GTM-XXXXXX',
    },
    // yandex metrika
    yandex: {
      old: 'XXXXXX',
      new: 'XXXXXX',
    },
  },

  // Эти стили не будут добавлены в main.scss
  ignoreScssPaths: [
    'scaffolds/components/_navigation.scss',
    'scaffolds/components/_logo.scss',
    'scaffolds/components/_feature-menu.scss',
    'scaffolds/components/_menu-toggle.scss',
    'scaffolds/components/_title.scss',
    'scaffolds/components/_swiper.scss',
    'scaffolds/components/_main-section.scss',
    'scaffolds/components/_card-article.scss',
    'scaffolds/components/_shape-decoration.scss',
    'scaffolds/components/_read-progress.scss',
    'scaffolds/components/_back-top.scss',

    'scaffolds/sections/_main-header.scss',
    'scaffolds/sections/_main-slider.scss',
    'scaffolds/sections/_inner-category.scss',
    'scaffolds/sections/_main-article.scss',
  ],

  proxy: 'http://localhost', // url виртуального хоста
  port: 3000, // порт виртуального хоста

  // Пути к каталогам для разработки проекта
  src: {
    root: srcPath, // корневой каталог

    // Шаблонизатор pug
    pug: {
      root: `${srcPath}/pug`, // корневой каталог pug
      data: `${srcPath}/pug/data`, // конфиги и json данные
      pages: `${srcPath}/pug/pages`, // pug страницы для компиляции в html
    },

    // Препроцессор Scss
    scss: `${srcPath}/scss`, // scss стили
    components: `${srcPath}/scss/scaffolds/components`, // компоненты

    // Скрипты
    js: {
      root: `${srcPath}/js`, // корневой каталог js
      components: `${srcPath}/js/components`, // компоненты js
    },

    libs: `${srcPath}/libs`, // сторонние библиотеки

    // Различные ресурсы
    assets: {
      root: `${srcPath}/assets`, // корневой каталог js
      images: `${srcPath}/assets/images`, // изображения
      favicons: `${srcPath}/assets/favicons`, // фавиконки
      icons: {
        root: `${srcPath}/assets/icons`, // корневой каталог svg иконок
        mono: `${srcPath}/assets/icons/mono`, // черно-белые иконки
        multi: `${srcPath}/assets/icons/multi`, // цветные иконки
      },
      fonts: `${srcPath}/assets/fonts`, // шрифты
    },
  },

  // Пути к каталогам для продакшен проекта
  build: {
    root: buildPath, // корневой каталог js
    css: `${buildPath}/css`, // стили
    js: `${buildPath}/js`, // скрипты
    images: `${buildPath}/img`, // изображения
    fonts: `${buildPath}/fonts`, // шрифты
  },

  // Определение окружения сборки проекта
  setEnv() {
    this.isProd = process.argv.includes('--prod') // true если сборка проекта выполнена с ключом --prod
    this.isDev = !this.isProd // false если сборка проекта выполнена без ключа --prod
  },
}

export default config
