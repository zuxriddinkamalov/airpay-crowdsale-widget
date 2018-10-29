import { remove, append } from 'ramda'

export const BASE_COLOR = 'rgba(55, 125, 254, 1)'

function trim (str) {
  return str.replace(/^\s+|\s+$/gm, '')
}

export const getRGB = (rgba, opacity) => {
  let color = rgba.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',')
  return 'rgba(' + append(opacity, remove(3, 1, color)).join() + ')'
}

export const hexToRGBA = (hex, opacity) => {
  let color
  if (/^([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    color = hex.split('')
    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]]
    }
    color = '0x' + color.join('')
    return 'rgba(' + [(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',') + `,${opacity})`
  }
}

export const hexToRGBCSS = (rgba) => {
  let color = rgba.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',')
  return remove(3, 1, color).join()
}

export const rgbaToHex = (rgba) => {
  let parts = rgba.substring(rgba.indexOf('(')).split(',')
  let r = parseInt(trim(parts[0].substring(1)), 10)
  let g = parseInt(trim(parts[1]), 10)
  let b = parseInt(trim(parts[2]), 10)
  let a = parseFloat(trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2)

  return ('#' + r.toString(16) + g.toString(16) + b.toString(16) + (a * 255).toString(16).substring(0, 2))
}
