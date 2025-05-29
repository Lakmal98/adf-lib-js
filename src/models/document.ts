import { ADFDocument, ADFContent } from '../types';

/**
 * Represents an ADF document.
 * 
 * This is the main class for creating and manipulating ADF documents.
 * It provides methods to add content and convert the document to the ADF format.
 */
export class ADF {
  private version: number;
  private type: string;
  private content: ADFContent[];

  /**
   * Creates a new ADF document.
   * 
   * @param version - The ADF version number (default: 1)
   * @param type - The document type (default: "doc")
   */
  constructor(version: number = 1, type: string = 'doc') {
    this.version = version;
    this.type = type;
    this.content = [];
  }

  /**
   * Adds content to the document.
   * 
   * @param content - The content element to add
   */
  public add(content: ADFContent): void {
    this.content.push(content);
  }

  /**
   * Converts the document to the ADF dictionary format.
   * 
   * @returns The complete ADF document as an object
   */
  public toDict(): ADFDocument {
    return {
      version: this.version,
      type: this.type,
      content: this.content,
    };
  }

  /**
   * Converts the document to a JSON string.
   * 
   * @param space - Number of spaces for pretty printing (optional)
   * @returns The ADF document as a JSON string
   */
  public toJSON(space?: number): string {
    return JSON.stringify(this.toDict(), null, space);
  }

  /**
   * Gets the current content array.
   * 
   * @returns The content array
   */
  public getContent(): ADFContent[] {
    return [...this.content];
  }

  /**
   * Gets the document version.
   * 
   * @returns The document version
   */
  public getVersion(): number {
    return this.version;
  }

  /**
   * Gets the document type.
   * 
   * @returns The document type
   */
  public getType(): string {
    return this.type;
  }
} 