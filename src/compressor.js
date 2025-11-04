#!/usr/bin/env node

import fs from "fs";
import path from "path";
import tiktoken from "tiktoken";

/**
 * Removes Markdown formatting like #, *, >, etc.
 * and extra spaces/newlines while keeping the text content.
 * 
 * @param {string} markdown - Original Markdown content
 * @returns {string} - Plain, cleaned text
 */
function compressMarkdown(markdown) {
  return markdown
    .replace(/^#+\s*/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
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

const encoder = tiktoken.get_encoding("o200k_base");
const originalTokens = encoder.encode(markdown).length;
const compressedTokens = encoder.encode(compressed).length;
const reductionPercent = (((originalTokens - compressedTokens) / originalTokens) * 100).toFixed(2);

console.log("\nToken count comparison:");
console.log("-----------------------");
console.log(`Original   : ${originalTokens} tokens`);
console.log(`Compressed : ${compressedTokens} tokens`);
console.log(`Reduction  : ${reductionPercent}%`);