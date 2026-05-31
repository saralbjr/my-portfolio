// ===== Types =====
export interface BlogContentBlock {
  type: "p" | "h2" | "h3" | "ul" | "code" | "quote";
  text?: string;
  items?: string[];
  code?: string;
  language?: string;
  author?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  link: string;
  content: BlogContentBlock[];
}

// ===== Helper: Convert blocks to markdown string =====
export function blocksToMarkdown(content: BlogContentBlock[]): string {
  if (!Array.isArray(content)) return "";
  return content
    .map((block) => {
      if (block.type === "p") {
        return block.text || "";
      }
      if (block.type === "h2") {
        return `## ${block.text || ""}`;
      }
      if (block.type === "h3") {
        return `### ${block.text || ""}`;
      }
      if (block.type === "ul" && Array.isArray(block.items)) {
        return block.items.map((item) => `- ${item}`).join("\n");
      }
      if (block.type === "code") {
        return `\`\`\`${block.language || "javascript"}\n${block.code || ""}\n\`\`\``;
      }
      if (block.type === "quote") {
        const text = block.text || "";
        const author = block.author ? `\n> — ${block.author}` : "";
        return `> ${text}${author}`;
      }
      return "";
    })
    .join("\n\n");
}

// ===== Helper: Convert markdown string to blocks =====
export function markdownToBlocks(markdown: string): BlogContentBlock[] {
  const blocks: BlogContentBlock[] = [];
  const lines = markdown.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Code blocks
    if (line.startsWith("```")) {
      const language = line.substring(3).trim();
      let code = "";
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code += lines[i] + "\n";
        i++;
      }
      if (code.endsWith("\n")) {
        code = code.slice(0, -1);
      }
      blocks.push({ type: "code", code, language: language || "javascript" });
      i++; // skip closing backticks
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        const text = lines[i].trim().substring(1).trim();
        quoteLines.push(text);
        i++;
      }

      // Extract author from lines if there is one (e.g. — Author or - Author)
      let author = "";
      const textLines = quoteLines.filter((ql) => {
        if (ql.startsWith("—") || ql.startsWith("-")) {
          author = ql.substring(1).trim();
          return false;
        }
        return true;
      });

      blocks.push({
        type: "quote",
        text: textLines.join(" "),
        ...(author ? { author } : {}),
      });
      continue;
    }

    // Unordered List
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        items.push(lines[i].trim().substring(2).trim());
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.substring(4).trim() });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.substring(3).trim() });
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      // Map # h1 to h2 in blocks to preserve styling consistency
      blocks.push({ type: "h2", text: line.substring(2).trim() });
      i++;
      continue;
    }

    // Paragraph
    let pText = line;
    i++;
    while (i < lines.length) {
      const nextLine = lines[i].trim();
      if (
        !nextLine ||
        nextLine.startsWith("```") ||
        nextLine.startsWith(">") ||
        nextLine.startsWith("- ") ||
        nextLine.startsWith("* ") ||
        nextLine.startsWith("#")
      ) {
        break;
      }
      pText += " " + nextLine;
      i++;
    }
    blocks.push({ type: "p", text: pText });
  }

  return blocks;
}
