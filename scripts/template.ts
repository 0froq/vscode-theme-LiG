import util from './util'

export type ColorPair = [string, string]
export type ColorTriad = [string, string, string]

export interface AccentInput {
  red: string
  green: string
  yellow: string
  blue: string
  magenta: string
  cyan: string
  orange: string
  azure: string
}

export interface NeutralInput {
  soft_50: string
  soft_100: string
  soft_200: string
  soft_300: string
  soft_400: string
  soft_500: string
  soft_600: string
  soft_700: string
  soft_800: string
  soft_900: string
  soft_950: string
}

export interface ThemePaletteInput {
  accents: AccentInput
  neutrals: NeutralInput
  black?: string
  white?: string
}

export interface ThemePalette extends NeutralInput {
  black: string
  white: string
  red: ColorTriad
  green: ColorTriad
  yellow: ColorTriad
  blue: ColorTriad
  magenta: ColorTriad
  cyan: ColorTriad
  orange: ColorTriad
  azure: ColorTriad
}

function genTriad(base: string): ColorTriad {
  return [
    util.blendFg(base, 0.6),
    base,
    util.blendBg(base, 0.6),
  ]
}

function pair(dark: string, light: string): ColorPair {
  return [dark, light]
}

function syntaxPair(triad: ColorTriad, index: 0 | 1 | 2): ColorPair {
  return [triad[index], triad[2 - index]]
}

function blendBgPair(color: ColorPair, amount: number, background: ColorPair): ColorPair {
  return [
    util.blend(color[0], amount, background[0]),
    util.blend(color[1], amount, background[1]),
  ]
}

function blendFgPair(color: ColorPair, amount: number, fg: ColorPair): ColorPair {
  return [
    util.blend(color[0], amount, fg[0]),
    util.blend(color[1], amount, fg[1]),
  ]
}

export function createThemePalette(input: ThemePaletteInput): ThemePalette {
  return {
    black: input.black ?? '#000000',
    white: input.white ?? '#ffffff',

    red: genTriad(input.accents.red),
    green: genTriad(input.accents.green),
    yellow: genTriad(input.accents.yellow),
    blue: genTriad(input.accents.blue),
    magenta: genTriad(input.accents.magenta),
    cyan: genTriad(input.accents.cyan),
    orange: genTriad(input.accents.orange),
    azure: genTriad(input.accents.azure),

    ...input.neutrals,
  }
}

export function createThemeColors(colors: ThemePalette) {
  const bg = pair(colors.soft_950, colors.soft_50)
  const bgAlt = pair(colors.soft_900, colors.soft_100)
  const fg = pair(colors.soft_300, colors.soft_700)
  const fgMuted = pair(colors.soft_600, colors.soft_400)
  const fgDim = pair(colors.soft_800, colors.soft_200)
  const softBg = pair(util.blendFg(colors.soft_950, 0.95), util.blendBg(colors.soft_50, 0.95))
  const softBgAlt = pair(colors.soft_900, colors.soft_200)

  // [dark, light]
  return {
    bg,
    bgAlt,
    bgFloat: bg,
    bgReversed: pair(colors.soft_100, colors.soft_900),
    bgHighlight: pair(colors.soft_400, colors.soft_600),

    fg,
    fgMuted,
    fgDim,
    fgReversed: pair(colors.soft_900, colors.soft_100),
    fgStrong: pair(colors.soft_50, colors.soft_950),
    fgSidebar: fgMuted,

    bgSelection: blendFgPair(bgAlt, 0.95, fg),
    bgCurLine: bgAlt,
    bgFold: blendFgPair(bgAlt, 0.8, fg),
    bgCurSearch: blendBgPair(pair(colors.yellow[1], colors.yellow[1]), 0.5, bg),
    bgIncurSearch: blendBgPair(pair(colors.yellow[1], colors.yellow[1]), 0.4, bg),
    bgSubstitue: pair(colors.red[1], colors.red[1]),
    bgStatusLine: blendFgPair(bg, 0.9, fg),

    border: fgMuted,
    borderMuted: pair(colors.soft_900, colors.soft_200),
    divider: fgMuted,
    shadow: fgDim,

    // soft overrides
    softBg,
    softBgAlt,
    softBgFloat: softBg,
    softBgSelection: blendFgPair(softBgAlt, 0.95, fg),
    softBgCurLine: softBgAlt,
    softBgFold: blendFgPair(softBgAlt, 0.8, fg),
    softBgCurSearch: blendBgPair(pair(colors.yellow[1], colors.yellow[1]), 0.5, softBg),
    softBgIncurSearch: blendBgPair(pair(colors.yellow[1], colors.yellow[1]), 0.4, softBg),
    softBgStatusLine: blendFgPair(softBg, 0.9, fg),

    // git
    gitAdd: pair(colors.green[1], colors.green[1]),
    gitDelete: pair(colors.red[1], colors.red[1]),
    gitChange: pair(colors.yellow[1], colors.yellow[1]),
    gitIgnore: fgMuted,

    // diagnostics
    diagError: pair(colors.red[1], colors.red[1]),
    diagWarn: pair(colors.yellow[1], colors.yellow[1]),
    diagInfo: pair(colors.cyan[1], colors.cyan[1]),
    diagHint: pair(colors.green[1], colors.green[1]),
    diagOk: pair(colors.blue[1], colors.blue[1]),

    // messages
    msgSuccess: pair(colors.green[1], colors.green[1]),
    msgFailure: pair(colors.red[1], colors.red[1]),
    msgWarning: pair(colors.yellow[1], colors.yellow[1]),
    msgInfo: pair(colors.cyan[1], colors.cyan[1]),

    // comments
    commentsError: pair(colors.red[1], colors.red[1]),
    commentsTodo: pair(colors.blue[1], colors.blue[1]),
    commentsWarning: pair(colors.yellow[1], colors.yellow[1]),
    commentsInfo: pair(colors.cyan[1], colors.cyan[1]),
    commentsNote: pair(colors.green[1], colors.green[1]),
    commentsHint: pair(colors.cyan[1], colors.cyan[1]),

    struct: pair(colors.green[1], colors.green[1]),
    structHl: syntaxPair(colors.green, 0),
    structFd: syntaxPair(colors.green, 2),
    action: pair(colors.orange[1], colors.orange[1]),
    actionHl: syntaxPair(colors.orange, 0),
    actionFd: syntaxPair(colors.orange, 2),
    ref: pair(colors.blue[1], colors.blue[1]),
    refHl: syntaxPair(colors.blue, 0),
    refFd: syntaxPair(colors.blue, 2),
    member: pair(colors.cyan[1], colors.cyan[1]),
    memberHl: syntaxPair(colors.cyan, 0),
    memberFd: syntaxPair(colors.cyan, 2),

    mono: fg,
    monoHl: pair(colors.soft_50, colors.soft_950),
    monoFd: fgMuted,

    accent1: pair(colors.green[1], colors.green[1]),
    accent2: pair(colors.orange[1], colors.orange[1]),
  } satisfies Record<string, ColorPair | string>
}
