/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ContentBlock, DraftStyleMap, Editor, EditorState } from "draft-js";
import { createRef, Dispatch, SetStateAction, useEffect } from "react";
import { useThemeState } from "../context/ThemeContext";
import { blockquoteStyle, codeStyle, getTheme, h1Style, h2Style, h3Style, h4Style, h5Style, h6Style } from "../utils";

// TODO: Add overriding inline styles
const styleMap: DraftStyleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block: ContentBlock): string {
  switch (block.getType()) {
    case "header-one":
      return h1Style;

    case "header-two":
      return h2Style;

    case "header-three":
      return h3Style;

    case "header-four":
      return h4Style;

    case "header-five":
      return h5Style;

    case "header-six":
      return h6Style;

    case "blockquote":
      return blockquoteStyle;

    case "code-block":
      return codeStyle;

    default:
      return "";
  }
}

/**
 * Types
 */
export interface EditorProps {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}

/**
 * Component
 */
const RichEditor = (props: EditorProps) => {
  const { editorState, setEditorState } = props;
  const editorRef = createRef<Editor>();
  const { mode } = useThemeState();

  const theme = getTheme(mode);

  const focus = () => editorRef.current?.focus();
  const onChange = (state: EditorState) => setEditorState(state);

  useEffect(focus, []);

  return (
    <div css={styles.container} onClick={focus}>
      <div css={[styles.editor, { caretColor: theme.text, color: theme.text }]} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={onChange}
          ref={editorRef}
          spellCheck
        />
      </div>
    </div>
  );
};

/**
 * Styles
 */
const styles = {
  container: css({
    padding: "20px",
    boxSizing: "border-box",
    width: "100%",
    height: "100%"
  }),

  editor: css({
    cursor: "text",
    fontSize: "1em"
  })
};

export default RichEditor;
