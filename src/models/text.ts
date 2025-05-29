import { ADFContent, ADFMark, TextMark, HeadingAttrs, ParagraphAttrs } from '../types';
import { ContentType, TextType, MarkType, HeadingLevel } from '../constants/enums';

/**
 * Error thrown when a required field is missing
 */
export class RequiredFieldError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RequiredFieldError';
  }
}

/**
 * Error thrown when an invalid mark is provided
 */
export class InvalidMarkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidMarkError';
  }
}

/**
 * Represents a text element in the ADF document.
 * 
 * This class provides functionality to create text content with various
 * formatting marks and convert it to different text elements like
 * headings and paragraphs.
 */
export class Text {
  private text: string;
  private marks: TextMark[];

  /**
   * Creates a new Text instance.
   * 
   * @param text - The actual text content
   * @param marks - Optional marks to apply to the text
   * @throws {RequiredFieldError} When text is empty
   */
  constructor(text: string, ...marks: TextMark[]) {
    if (!text) {
      throw new RequiredFieldError('text is required');
    }

    this.text = text;
    this.marks = marks;
  }

  /**
   * Validates and formats the marks applied to the text.
   * 
   * @param marks - Array of marks to validate
   * @returns Array of validated mark objects
   * @throws {InvalidMarkError} When an invalid mark is provided
   */
  private validateMarks(marks: TextMark[]): ADFMark[] {
    const acceptedMarks: ADFMark[] = [];
    const validMarks = Object.values(MarkType);

    for (const mark of marks) {
      if (typeof mark === 'object' && 'type' in mark) {
        // It's already an ADFMark object
        if (!validMarks.includes(mark.type as MarkType) && typeof mark.type !== 'string') {
          throw new InvalidMarkError(`Invalid mark: ${JSON.stringify(mark)}`);
        }
        acceptedMarks.push(mark);
      } else if (typeof mark === 'string') {
        // It's a string mark type
        if (validMarks.includes(mark as MarkType)) {
          acceptedMarks.push({ type: mark });
        } else {
          throw new InvalidMarkError(`Invalid mark: ${mark}`);
        }
      } else {
        throw new InvalidMarkError(`Invalid mark: ${JSON.stringify(mark)}`);
      }
    }

    return acceptedMarks;
  }

  /**
   * Creates the content array for the text element.
   * 
   * @returns The content in ADF format
   */
  private createContent(): ADFContent[] {
    const content: ADFContent = {
      type: ContentType.TEXT,
      text: this.text,
    };

    const validatedMarks = this.validateMarks(this.marks);
    if (validatedMarks.length > 0) {
      content.marks = validatedMarks;
    }

    return [content];
  }

  /**
   * Creates a heading element.
   * 
   * @param level - The heading level (1-6)
   * @param localId - Optional local identifier
   * @returns The heading in ADF format
   */
  public heading(level: HeadingLevel | number = HeadingLevel.H1, localId?: string): ADFContent {
    const levelValue = typeof level === 'number' ? level : Number(level);

    const attrs: HeadingAttrs = { level: levelValue };
    if (localId !== undefined) {
      attrs.localId = localId;
    }

    return {
      type: TextType.HEADING,
      attrs,
      content: this.createContent(),
    };
  }

  /**
   * Creates a paragraph element.
   * 
   * @param localId - Optional local identifier
   * @returns The paragraph in ADF format
   */
  public paragraph(localId?: string): ADFContent {
    const result: ADFContent = {
      type: TextType.PARAGRAPH,
      content: this.createContent(),
    };

    if (localId !== undefined) {
      const attrs: ParagraphAttrs = { localId };
      result.attrs = attrs;
    }

    return result;
  }

  /**
   * Merges multiple paragraphs into a single inline paragraph.
   * 
   * @param paragraphs - The paragraphs to merge
   * @param spacing - The number of spaces between paragraphs (default: 1)
   * @returns The combined paragraph in ADF format
   */
  public static mergeParagraphs(paragraphs: ADFContent[], spacing: number = 1): ADFContent {
    const content: ADFContent[] = [];

    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      if (paragraph?.content) {
        content.push(...paragraph.content);
        
        // Add spacing between paragraphs (but not after the last one)
        if (i < paragraphs.length - 1 && spacing > 0) {
          content.push({
            type: ContentType.TEXT,
            text: ' '.repeat(spacing),
          });
        }
      }
    }

    return {
      type: TextType.PARAGRAPH,
      content,
    };
  }

  /**
   * Gets the text content.
   * 
   * @returns The text content
   */
  public getText(): string {
    return this.text;
  }

  /**
   * Gets the marks applied to the text.
   * 
   * @returns Array of text marks
   */
  public getMarks(): TextMark[] {
    return [...this.marks];
  }
} 