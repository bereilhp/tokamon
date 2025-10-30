# How to Use the LLM-Aware Markdown Compressor

Large Language Models (LLMs) like GPT or Claude process text in *tokens*, not characters. This means that the cost and speed of processing depend heavily on how verbose your text is. 

The goal of this compressor is to reduce the number of tokens **without changing the meaning** of the text. It uses language heuristics, abbreviation patterns, and Markdown structure awareness to achieve this.

## Why It Matters

Token compression helps reduce API costs, improve response times, and fit more context into LLM prompts. It’s particularly useful for applications that process long Markdown files such as documentation, blogs, or chat histories.

## Conclusion

This project demonstrates how linguistic awareness and Markdown parsing can lead to meaningful compression — not by deleting content, but by **expressing the same meaning more efficiently**.
