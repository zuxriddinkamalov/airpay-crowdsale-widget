import { remove, append } from 'ramda'

export const getRGB = (rgba, opacity) => {
  let color = rgba.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',')
  let RGBA = 'rgba(' + append(opacity, remove(3, 1, color)).join() + ')'
  return RGBA
}
