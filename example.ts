import { ADF, Text, Table, Link, HeadingLevel } from './src';
import { writeFileSync } from 'fs';

// Create a new document
const doc = new ADF();

// Add a heading
doc.add(new Text("My Document").heading(HeadingLevel.H1));

// Add a paragraph with a link
const link = new Link("https://example.com", "Example");
const p1 = new Text("Hello I").paragraph();
const p2 = new Text("am", "strong").paragraph();
const p3 = new Text("a heading").heading();
doc.add(Text.mergeParagraphs([p1, p2, p3, new Text("Click here", link.toMark(), "strong", 'em').paragraph()]));
doc.add(new Text("Lakmal").paragraph());
doc.add(new Text("Click here", link.toMark(), "strong", 'em').paragraph());

// Create a table
const table = new Table(100, true);
table.addRow([
  table.header([new Text("Header").paragraph()]),
  table.header([new Text("Content").paragraph()]),
]);
table.addRow([
  table.cell([new Text("Header").paragraph()]),
  table.cell([new Text("Content").paragraph()]),
]);
doc.add(table.toDict());

// Convert to dictionary
const adfDict = doc.toDict();

console.log(JSON.stringify(adfDict, null, 2));

// Write to JSON file
writeFileSync("output.json", JSON.stringify(adfDict, null, 2)); 