/**
 * Defines the available content types in the ADF document.
 */
export enum ContentType {
  TEXT = 'text',
  TABLE = 'table',
}

/**
 * Defines the available text types in the ADF document.
 */
export enum TextType {
  HEADING = 'heading',
  PARAGRAPH = 'paragraph',
}

/**
 * Defines the available heading levels (H1-H6).
 */
export enum HeadingLevel {
  H1 = 1,
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
}

/**
 * Defines the available text marking types.
 */
export enum MarkType {
  CODE = 'code',
  EM = 'em',
  LINK = 'link',
  STRIKE = 'strike',
  STRONG = 'strong',
  SUBSUP = 'subsup',
  UNDERLINE = 'underline',
  TEXT_COLOR = 'textColor',
}

/**
 * Defines the available table layout options.
 */
export enum TableLayout {
  CENTER = 'center',
  ALIGN_START = 'align-start',
}

/**
 * Defines the available table display modes.
 */
export enum TableDisplayMode {
  DEFAULT = 'default',
  FIXED = 'fixed',
} 