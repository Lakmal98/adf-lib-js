import { ADFContent, TableAttrs, TableCellAttrs } from '../types';
import { ContentType, TableLayout, TableDisplayMode } from '../constants/enums';

/**
 * Represents a table in the ADF document.
 * 
 * This class provides functionality to create and manipulate tables
 * with support for headers, cells, and various layout options.
 */
export class Table {
  private width: number;
  private isNumberColumnEnabled: boolean;
  private layout: TableLayout | string;
  private displayMode: TableDisplayMode | string;
  private rows: ADFContent[];

  /**
   * Creates a new Table instance.
   * 
   * @param width - The width of the table
   * @param isNumberColumnEnabled - Whether to show numbered columns (default: false)
   * @param layout - The table layout style (default: TableLayout.CENTER)
   * @param displayMode - The table display mode (default: TableDisplayMode.DEFAULT)
   */
  constructor(
    width: number,
    isNumberColumnEnabled: boolean = false,
    layout: TableLayout | string = TableLayout.CENTER,
    displayMode: TableDisplayMode | string = TableDisplayMode.DEFAULT
  ) {
    this.width = width;
    this.isNumberColumnEnabled = isNumberColumnEnabled;
    this.layout = layout;
    this.displayMode = displayMode;
    this.rows = [];
  }

  /**
   * Creates a table cell (header or regular cell).
   * 
   * @param cellType - The type of cell ("tableHeader" or "tableCell")
   * @param content - The cell content
   * @param colSpan - Number of columns the cell spans (default: 1)
   * @param rowSpan - Number of rows the cell spans (default: 1)
   * @returns The cell in ADF format
   */
  private createCell(
    cellType: string,
    content: ADFContent[],
    colSpan: number = 1,
    rowSpan: number = 1
  ): ADFContent {
    const attrs: TableCellAttrs = {
      colspan: colSpan,
      rowspan: rowSpan,
    };

    return {
      type: cellType,
      attrs,
      content,
    };
  }

  /**
   * Creates a table header cell.
   * 
   * @param content - The cell content
   * @param colSpan - Number of columns the cell spans (default: 1)
   * @param rowSpan - Number of rows the cell spans (default: 1)
   * @returns The header cell in ADF format
   */
  public header(content: ADFContent[], colSpan: number = 1, rowSpan: number = 1): ADFContent {
    return this.createCell('tableHeader', content, colSpan, rowSpan);
  }

  /**
   * Creates a regular table cell.
   * 
   * @param content - The cell content
   * @param colSpan - Number of columns the cell spans (default: 1)
   * @param rowSpan - Number of rows the cell spans (default: 1)
   * @returns The cell in ADF format
   */
  public cell(content: ADFContent[], colSpan: number = 1, rowSpan: number = 1): ADFContent {
    return this.createCell('tableCell', content, colSpan, rowSpan);
  }

  /**
   * Adds a row to the table.
   * 
   * @param cells - Array of cells for the row
   */
  public addRow(cells: ADFContent[]): void {
    this.rows.push({
      type: 'tableRow',
      content: cells,
    });
  }

  /**
   * Converts the table to ADF format.
   * 
   * @returns The table in ADF format
   */
  public toDict(): ADFContent {
    const attrs: TableAttrs = {
      isNumberColumnEnabled: this.isNumberColumnEnabled,
      layout: this.layout,
      width: this.width,
      displayMode: this.displayMode,
    };

    return {
      type: ContentType.TABLE,
      attrs,
      content: this.rows,
    };
  }

  /**
   * Gets the table width.
   * 
   * @returns The table width
   */
  public getWidth(): number {
    return this.width;
  }

  /**
   * Gets whether number columns are enabled.
   * 
   * @returns True if number columns are enabled
   */
  public getIsNumberColumnEnabled(): boolean {
    return this.isNumberColumnEnabled;
  }

  /**
   * Gets the table layout.
   * 
   * @returns The table layout
   */
  public getLayout(): TableLayout | string {
    return this.layout;
  }

  /**
   * Gets the display mode.
   * 
   * @returns The display mode
   */
  public getDisplayMode(): TableDisplayMode | string {
    return this.displayMode;
  }

  /**
   * Gets the table rows.
   * 
   * @returns Array of table rows
   */
  public getRows(): ADFContent[] {
    return [...this.rows];
  }
} 