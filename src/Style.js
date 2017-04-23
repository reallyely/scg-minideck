import chroma from 'chroma-js'

export const bgLow = "#E3E8ED"
export const bgHigh = "#A47BF7"
export const accentLow = '#D8B041'
export const accentHigh = '#D65544'
export const primaryLow = '#5B4587'
export const primaryHigh = '#0081FF'
export const bg = '#807075'
export const text = '#333'

export const accentScale = chroma.scale([accentLow, accentHigh]).mode('lab').colors(5)
export const primaryScale = chroma.scale([primaryLow, primaryHigh]).mode('lab').colors(5)
export const bgScale = chroma.scale([bgLow, bgHigh]).mode('lab').colors(5)
// return an object that will be assigned to a style obj. Keys are css rules
export function modScale(i, scale, properties, prevState) {
  return properties.reduce((outObj, prop) => {
    outObj[prop] = scale[i]
    return outObj
  }, prevState || {})
}