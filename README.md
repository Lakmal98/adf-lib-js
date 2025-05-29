# ADF Library

## Overview
ADF Library is a TypeScript package for creating and manipulating ADF (Atlassian Document Format) documents. It provides a clean, type-safe API for building structured documents with support for headings, paragraphs, tables, and rich text formatting.

## Installation
```bash
npm install adf-lib-js
```

## Quick Start

```typescript
import { ADF, Text, Table, Link, HeadingLevel } from 'adf-lib-js';

// Create a new document
const doc = new ADF();

// Add a heading
doc.add(new Text("My Document").heading(HeadingLevel.H1));

// Add a paragraph with formatting
doc.add(new Text("This is a formatted paragraph", "strong", "em").paragraph());

// Export as dictionary
const adfDict = doc.toDict();
```

## Core Components

### Document Structure
The ADF document is composed of various content types organized in a hierarchical structure:

```typescript
{
  "version": 1,
  "type": "doc",
  "content": [
    // Content elements go here
  ]
}
```

### Content Types
The library supports the following content types:

```typescript
enum ContentType {
  TEXT = "text",
  TABLE = "table"
}
```

### Text Types
Text content can be formatted as:

```typescript
enum TextType {
  HEADING = "heading",
  PARAGRAPH = "paragraph"
}
```

## Detailed API Reference

### ADF Class
The main document class that serves as a container for all content.

```typescript
class ADF {
  constructor(version: number = 1, type: string = "doc")
  add(content: ADFContent): void
  toDict(): ADFDocument
  toJSON(space?: number): string
}
```

#### Parameters:
- `version`: Document version (default: 1)
- `type`: Document type (default: "doc")

#### Methods:
- `add(content)`: Adds a content element to the document
- `toDict()`: Converts the document to a dictionary format
- `toJSON()`: Converts the document to a JSON string

### Text Class
Handles text content with formatting.

```typescript
class Text {
  constructor(text: string, ...marks: TextMark[])
  heading(level: HeadingLevel | number = HeadingLevel.H1, localId?: string): ADFContent
  paragraph(localId?: string): ADFContent
  static mergeParagraphs(paragraphs: ADFContent[], spacing: number = 1): ADFContent
}
```

#### Parameters:
- `text`: The text content
- `marks`: Optional formatting marks

#### Methods:
- `heading()`: Creates a heading element
- `paragraph()`: Creates a paragraph element
- `mergeParagraphs()`: Merges multiple paragraphs into one

### Table Class
Handles table creation and manipulation.

```typescript
class Table {
  constructor(
    width: number,
    isNumberColumnEnabled: boolean = false,
    layout: TableLayout | string = TableLayout.CENTER,
    displayMode: TableDisplayMode | string = TableDisplayMode.DEFAULT
  )
  header(content: ADFContent[], colSpan: number = 1, rowSpan: number = 1): ADFContent
  cell(content: ADFContent[], colSpan: number = 1, rowSpan: number = 1): ADFContent
  addRow(cells: ADFContent[]): void
  toDict(): ADFContent
}
```

#### Parameters:
- `width`: Table width (percentage)
- `isNumberColumnEnabled`: Enable numbered columns
- `layout`: Table layout style
- `displayMode`: Display mode

#### Methods:
- `header()`: Creates a header cell
- `cell()`: Creates a regular cell
- `addRow()`: Adds a row to the table
- `toDict()`: Converts table to dictionary format

### Link Class
Handles hyperlinks in the document.

```typescript
class Link {
  constructor(
    href: string,
    title?: string,
    collection?: string,
    id?: string,
    occurrenceKey?: string
  )
  toMark(): ADFMark
}
```

#### Methods:
- `toMark()`: Converts link to mark format

## Text Formatting
The library supports various text formatting options through the `MarkType` enum:

```typescript
enum MarkType {
  CODE = "code",          // Code formatting
  EM = "em",             // Emphasis (italic)
  LINK = "link",         // Hyperlink
  STRIKE = "strike",     // Strikethrough
  STRONG = "strong",     // Bold
  SUBSUP = "subsup",     // Subscript/Superscript
  UNDERLINE = "underline",  // Underline
  TEXT_COLOR = "textColor"  // Text color
}
```

## Tables
Tables can be configured with different layouts and display modes:

```typescript
enum TableLayout {
  CENTER = "center",
  ALIGN_START = "align-start"
}

enum TableDisplayMode {
  DEFAULT = "default",
  FIXED = "fixed"
}
```

## Examples

### Creating a Document with Multiple Elements

```typescript
import { ADF, Text, Table, Link, HeadingLevel, TableLayout } from 'adf-lib-js';

// Create document
const doc = new ADF();

// Add heading
doc.add(new Text("Project Report").heading(HeadingLevel.H1));

// Add paragraph with formatting
doc.add(new Text("Executive Summary", "strong").paragraph());

// Add link
const link = new Link("https://example.com", "More Info");
doc.add(new Text("See details here", link.toMark()).paragraph());

// Create table
const table = new Table(100, false, TableLayout.CENTER);
table.addRow([
  table.header([new Text("Column 1").paragraph()]),
  table.header([new Text("Column 2").paragraph()])
]);
table.addRow([
  table.cell([new Text("Data 1").paragraph()]),
  table.cell([new Text("Data 2").paragraph()])
]);
doc.add(table.toDict());

// Export as JSON
console.log(doc.toJSON(2));
```

### Working with Complex Text Formatting

```typescript
import { ADF, Text, Link, MarkType } from 'adf-lib-js';

const doc = new ADF();

// Create a link
const link = new Link("https://atlassian.com", "Atlassian");

// Add text with multiple formatting marks
doc.add(new Text("This is bold and italic text", "strong", "em").paragraph());

// Add text with a link
doc.add(new Text("Visit our website", link.toMark()).paragraph());

// Add code formatting
doc.add(new Text("console.log('Hello World')", MarkType.CODE).paragraph());
```

## Development

### Building the Project
```bash
npm run build
```

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Testing

This library includes comprehensive unit tests with excellent coverage:

- **65 test cases** covering all functionality
- **100% statement coverage**
- **100% line coverage** 
- **94% branch coverage**
- **100% function coverage**

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode
npm run test:watch
```

### Test Categories

The test suite covers:

- **ADF Document**: Creation, content management, serialization
- **Text Class**: Text creation, formatting, headings, paragraphs, mark validation
- **Table Class**: Table creation, cells, headers, rows, layouts
- **Link Class**: Link creation, mark conversion, all properties
- **Enums**: All enum values and types
- **Error Handling**: Custom error classes and validation
- **Integration Tests**: Complex document creation and real-world scenarios

## License
MIT License - see LICENSE file for details.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.