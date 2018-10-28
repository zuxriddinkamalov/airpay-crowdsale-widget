import { remove, append } from 'ramda'

export const BASE_COLOR = 'rgba(55, 125, 254, 1)'

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
