import darkModeIcon from "../../images/dark_mode.svg"
import lightModeIcon from "../../images/bright_mode.svg"

export function onClickChangeTheme(e) {
  const iconImg = e.target
  let theme = JSON.parse(localStorage.getItem('theme')) || 'light'

  if (theme === 'light') {
    theme = 'dark'
    document.body.setAttribute("data-theme", theme)
    iconImg.src = lightModeIcon
    localStorage.setItem('theme', JSON.stringify(theme))
  } else {
    theme = 'light'
    document.body.setAttribute("data-theme", theme)
    iconImg.src = darkModeIcon
    localStorage.setItem('theme', JSON.stringify(theme))
  }
}

export function getTheme(color) {
  document.body.setAttribute("data-theme", color)
}
