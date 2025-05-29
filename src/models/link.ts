import { ADFMark, LinkAttrs } from '../types';
import { MarkType } from '../constants/enums';

/**
 * Represents a hyperlink in an ADF document.
 * 
 * This class provides functionality to create and manipulate hyperlinks
 * that can be used as marks within text content.
 */
export class Link {
  private href: string;
  private title?: string | undefined;
  private collection?: string | undefined;
  private id?: string | undefined;
  private occurrenceKey?: string | undefined;

  /**
   * Creates a new Link instance.
   * 
   * @param href - The URL the link points to
   * @param title - Optional title for the link
   * @param collection - Optional collection identifier
   * @param id - Optional unique identifier
   * @param occurrenceKey - Optional occurrence key
   */
  constructor(
    href: string,
    title?: string | undefined,
    collection?: string | undefined,
    id?: string | undefined,
    occurrenceKey?: string | undefined
  ) {
    this.href = href;
    this.title = title;
    this.collection = collection;
    this.id = id;
    this.occurrenceKey = occurrenceKey;
  }

  /**
   * Converts the link to a mark format that can be applied to text.
   * 
   * @returns The link as an ADF mark object
   */
  public toMark(): ADFMark {
    const attrs: LinkAttrs = {
      href: this.href,
    };

    if (this.title !== undefined) {
      attrs.title = this.title;
    }
    if (this.collection !== undefined) {
      attrs.collection = this.collection;
    }
    if (this.id !== undefined) {
      attrs.id = this.id;
    }
    if (this.occurrenceKey !== undefined) {
      attrs.occurrenceKey = this.occurrenceKey;
    }

    return {
      type: MarkType.LINK,
      attrs,
    };
  }

  /**
   * Gets the href URL.
   * 
   * @returns The href URL
   */
  public getHref(): string {
    return this.href;
  }

  /**
   * Gets the title.
   * 
   * @returns The title or undefined
   */
  public getTitle(): string | undefined {
    return this.title;
  }

  /**
   * Gets the collection.
   * 
   * @returns The collection or undefined
   */
  public getCollection(): string | undefined {
    return this.collection;
  }

  /**
   * Gets the ID.
   * 
   * @returns The ID or undefined
   */
  public getId(): string | undefined {
    return this.id;
  }

  /**
   * Gets the occurrence key.
   * 
   * @returns The occurrence key or undefined
   */
  public getOccurrenceKey(): string | undefined {
    return this.occurrenceKey;
  }
} 