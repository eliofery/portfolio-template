/**
 * Перенос файлов в продакшн
 *
 * Копирует файлы из src в build
 */

// Сторонние библиотеки
import { src, dest, watch, series } from 'gulp' // gulp плагин
import merge from 'merge-stream' // слияние gulp потоков
import uglify from 'gulp-uglify-es' // сжатие js
import gulpif from 'gulp-if' // вызывает функции по условию

// Конфиги
import config from '../config'

// Переносит в корень build
const rootBuild = () =>
  src([`${config.src.assets.root}/robots.txt`, `${config.src.assets.root}/manifest.json`]).pipe(
    dest(`${config.build.root}`),
  )

// Переносит в build/fonts
const fontsBuild = () =>
  src([`${config.src.assets.fonts}/**/*`, `${config.src.libs}/slick-carousel/fonts/*`]).pipe(
    dest(`${config.build.fonts}`),
  )

// Переносит в build/img
const imageBuild = () => src([`${config.src.libs}/slick-carousel/ajax-loader.gif`]).pipe(dest(`${config.build.images}`))

// Переносит в build/js
const jsBuild = () =>
  src([`${config.src.js.root}/Search.js`])
    .pipe(gulpif(config.isProd, uglify()))
    .pipe(dest(`${config.build.js}`))

// Переносит содержимое из библиотек node_modules в src/assets/libs
const componentsBuild = () => {
  // Список библиотек, которые будут переноситься
  const folders = ['slick-carousel/slick']

  const tasks = folders.map(folder => {
    const pathFolder = `node_modules/${folder}` // полный путь до node_modules библиотеки
    const nameFolder = pathFolder.match(/^[a-zA-Z0-9_]*\/([a-zA-Z0-9-_.]*)/)[1] // название библиотеки, например slick-carousel

    return src(`${pathFolder}/**/*`).pipe(dest(`${config.src.libs}/${nameFolder}`))
  })

  return merge(tasks)
}

// Выполнение всех тасков
export const assetsBuild = series(componentsBuild, fontsBuild, rootBuild, imageBuild, jsBuild)

// Слежение за изменением файлов
export const assetsWatch = () => {
  watch(`${config.src.assets.fonts}/**/*`, fontsBuild)
  watch(`${config.src.assets.root}/*`, rootBuild)
  watch(`${config.src.js.root}/Search.js`, jsBuild)
}
