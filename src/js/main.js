import navigation from '@/components/navigation'
import darkMode from '@/components/dark-mode'
import translate from '@/components/google-translate'
import search from '@/components/search'
import slider from '@/components/slider'
import homeBg from '@/components/home-bg'

document.documentElement.classList.remove('no-js')
navigation()
darkMode()
search()
slider()
translate()
homeBg()
