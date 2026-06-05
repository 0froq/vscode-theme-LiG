import { colors, LiGThemes } from './colors'

export interface GetThemeOptions {
  color: 'light' | 'dark'
  name: string
  soft?: boolean
}

function toArray<T>(arr: T | T[]): T[] {
  if (Array.isArray(arr))
    return arr
  return [arr]
}

function getColors(style: 'light' | 'dark'): typeof colors {
  if (style === 'light') {
    const lightColors: any = {}
    Object.entries(colors).forEach(([name, val]) => {
      if (Array.isArray(val))
        lightColors[name] = [...toArray(val)].reverse()
      else
        lightColors[name] = val
    })
    return lightColors
  }

  return colors
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function createThemeHelpers({ color, soft = false }: GetThemeOptions) {
  const pick = (options: { light?: string, dark?: string }) => {
    return options[color]
  }

  // Get color from oQThemes
  const c = (key: keyof typeof LiGThemes, op = '') => {
    let obj = soft
      ? LiGThemes[`soft${capitalize(key)}` as keyof typeof LiGThemes] || LiGThemes[key]
      : LiGThemes[key]

    if (typeof obj === 'string')
      obj = [obj, obj]

    return pick({ light: obj[1] + op, dark: obj[0] + op })
  }

  // Get hl from oQThemes
  // const hl = (key: keyof typeof oQThemes) => {

  // }

  const colors = getColors(color)

  return {
    pick,
    colors,
    v: c,
  }
}
