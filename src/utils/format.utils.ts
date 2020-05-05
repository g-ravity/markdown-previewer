import { convertToRaw, EditorState, RawDraftInlineStyleRange } from "draft-js";

const mdSymbols: MDSymbols = {
  block: {
    "header-one": {
      open: "# ",
      close: ""
    },
    "header-two": {
      open: "## ",
      close: ""
    },
    "header-three": {
      open: "### ",
      close: ""
    },
    "header-four": {
      open: "#### ",
      close: ""
    },
    "header-five": {
      open: "##### ",
      close: ""
    },
    "header-six": {
      open: "###### ",
      close: ""
    },
    blockquote: {
      open: "> ",
      close: ""
    },
    "unordered-list-item": {
      open: "- ",
      close: ""
    },
    "ordered-list-item": {
      open: "1. ",
      close: ""
    },
    "code-block": {
      open: "```",
      close: "```"
    },
    unstyled: {
      open: "",
      close: ""
    }
  },
  inline: {
    BOLD: {
      open: "**",
      close: "**"
    },
    ITALIC: {
      open: "*",
      close: "*"
    },
    UNDERLINE: {
      open: "<ins>",
      close: "</ins>"
    }
  }
};

export interface Markdown {
  key: string;
  text: string;
}

export interface Symbols {
  [key: string]: {
    open: string;
    close: string;
  };
}

export interface MDSymbols {
  block: Symbols;
  inline: Symbols;
}

const renderInlineSymbols = (inlineStyle: RawDraftInlineStyleRange[], text: string): string => {
  for (let i = 0; i < inlineStyle.length; i += 1) {
    let { offset, length } = inlineStyle[i];
    const { style } = inlineStyle[i];

    for (let j = 0; j < i; j += 1) {
      const { offset: prevOffset, length: prevLength } = inlineStyle[j];

      if (prevOffset <= offset) offset += mdSymbols.inline[inlineStyle[j].style].open.length;
      if (prevOffset + prevLength <= offset) offset += mdSymbols.inline[inlineStyle[j].style].close.length;
      if (prevOffset > offset && prevOffset <= offset + length)
        length += mdSymbols.inline[inlineStyle[j].style].open.length;
      if (prevOffset + prevLength > offset && prevOffset + prevLength <= offset + length)
        length += mdSymbols.inline[inlineStyle[j].style].close.length;
    }

    text =
      text.slice(0, offset) +
      mdSymbols.inline[style].open +
      text.slice(offset, offset + length) +
      mdSymbols.inline[style].close +
      text.slice(offset + length, text.length);
  }

  return text;
};

export const formatRichText = (editorState: EditorState): Markdown[] => {
  const content = convertToRaw(editorState.getCurrentContent());
  let markdown: Markdown[] = [];

  markdown = content.blocks.map(block => ({
    key: block.key,
    text:
      mdSymbols.block[block.type].open +
      renderInlineSymbols(block.inlineStyleRanges, block.text) +
      mdSymbols.block[block.type].close
  }));

  return markdown;
};

// TODO: Implement markdown to rich text object functionality
export const formatMarkdown = () => {
  console.log("Markdown to Rich Text Object");
};
