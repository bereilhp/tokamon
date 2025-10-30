#!/usr/bin/env node

import fs from "fs";
import path from "path";

/**
 * Removes Markdown formatting like #, *, >, etc.
 * and extra spaces/newlines while keeping the text content.
 * 
 * @param {string} markdown - Original Markdown content
 * @returns {string} - Plain, cleaned text
 */
function compressMarkdown(markdown) {
  return markdown
    // Remove headers (#, ##, ###)
    .replace(/^#+\s*/gm, "")
    // Remove blockquotes (>)
    .replace(/^\s*>\s?/gm, "")
    // Remove bold and italic markers (*, **, _, __)
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    // Remove inline code backticks
    .replace(/`([^`]+)`/g, "$1")
    // Remove code block fences ```
    .replace(/```[\s\S]*?```/g, "")
    // Remove extra spaces/tabs
    .replace(/[ \t]+/g, " ")
    // Replace 3+ newlines with 2
    .replace(/\n{3,}/g, "\n\n")
    // Trim lines and file
    .split("\n")
    .map(line => line.trim())
    .join("\n")
    .trim();
}

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: tokamon <path-to-markdown>");
  process.exit(1);
}

const markdown = fs.readFileSync(path.resolve(inputPath), "utf8");
const compressed = compressMarkdown(markdown);

const outputPath = inputPath.replace(/\.md$/, ".compressed.md");
fs.writeFileSync(outputPath, compressed);

console.log(`Compressed file saved as ${outputPath}`);
