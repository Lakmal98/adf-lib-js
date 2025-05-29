import { HeadingLevel, MarkType, TableLayout, TableDisplayMode } from '../constants/enums';

/**
 * Base interface for all ADF content elements
 */
export interface ADFContent {
  type: string;
  attrs?: Record<string, unknown>;
  content?: ADFContent[];
  text?: string;
  marks?: ADFMark[];
}

/**
 * Interface for text marks (formatting)
 */
export interface ADFMark {
  type: MarkType | string;
  attrs?: Record<string, unknown>;
}

/**
 * Interface for ADF document
 */
export interface ADFDocument {
  version: number;
  type: string;
  content: ADFContent[];
}

/**
 * Interface for heading attributes
 */
export interface HeadingAttrs extends Record<string, unknown> {
  level: HeadingLevel | number;
  localId?: string | undefined;
}

/**
 * Interface for paragraph attributes
 */
export interface ParagraphAttrs extends Record<string, unknown> {
  localId?: string | undefined;
}

/**
 * Interface for table attributes
 */
export interface TableAttrs extends Record<string, unknown> {
  isNumberColumnEnabled?: boolean | undefined;
  layout?: TableLayout | string | undefined;
  displayMode?: TableDisplayMode | string | undefined;
  width?: number | undefined;
  localId?: string | undefined;
}

/**
 * Interface for table cell attributes
 */
export interface TableCellAttrs extends Record<string, unknown> {
  colspan?: number | undefined;
  rowspan?: number | undefined;
  colwidth?: number[] | undefined;
  background?: string | undefined;
}

/**
 * Interface for link attributes
 */
export interface LinkAttrs extends Record<string, unknown> {
  href: string;
  title?: string | undefined;
  collection?: string | undefined;
  id?: string | undefined;
  occurrenceKey?: string | undefined;
}

/**
 * Type for text marks that can be applied
 */
export type TextMark = MarkType | string | ADFMark; 