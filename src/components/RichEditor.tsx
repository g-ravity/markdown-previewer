/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ContentBlock, DraftStyleMap, Editor, EditorState } from "draft-js";
import { css as eCss } from "emotion";
import { createRef, Dispatch, SetStateAction } from "react";

/**
 * Types
 */
export interface EditorProps {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}

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
 * Component
 */
const RichEditor = (props: EditorProps) => {
  const { editorState, setEditorState } = props;
  const editorRef = createRef<Editor>();

  const focus = () => editorRef.current?.focus();
  const onChange = (state: EditorState) => setEditorState(state);

  return (
    <div css={styles.container}>
      <div css={styles.editor} onClick={focus}>
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
    fontSize: "14px",
    padding: "15px"
  }),

  editor: css({
    borderTop: "1px solid #ddd",
    cursor: "text",
    fontSize: "16px",
    marginTop: "10px"
  })
};

// TODO: Separate the rich text styles into a separate file
const h1Style = eCss`
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  padding-bottom: .3em;
  border-bottom: 1px solid #eaecef;
  font-size: 2em;
`;

const h2Style = eCss`
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  padding-bottom: .3em;
  border-bottom: 1px solid #eaecef;
  font-size: 1.5em;
`;

const h3Style = eCss`
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  font-size: 1.25em;
`;

const h4Style = eCss`
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  font-size: 1em;
`;

const h5Style = eCss`
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  font-size: .875em;
`;

const h6Style = eCss`
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  font-size: .85em;
  color: #6a737d;
`;

const blockquoteStyle = eCss`
  border-left: .25em solid #dfe2e5;
  color: #6a737d;
  padding: 0 1em;
  margin-top: 0;
  margin-bottom: 16px
`;

const codeStyle = eCss`
  padding: 16px;
  overflow: auto;
  font-size: .85em;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
  word-wrap: normal;

  div{
    font-size: 1.18em;
  }
`;

export default RichEditor;
