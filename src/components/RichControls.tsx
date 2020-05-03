/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { EditorState } from "draft-js";
import { StyleButton } from "./widgets/StyleButton";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

/**
 * Types
 */
export interface RichControlProps {
  editorState: EditorState;
  onToggle: (style: string) => void;
}

/**
 * Components
 */
export const BlockControls = (props: RichControlProps) => {
  const { editorState, onToggle } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return (
    <div css={[styles.buttonContainer, { marginBottom: "5px" }]}>
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export const InlineControls = (props: RichControlProps) => {
  const { editorState, onToggle } = props;
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div css={styles.buttonContainer}>
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

/**
 * Styles
 */
const styles = {
  buttonContainer: css({
    display: "flex",
    alignItems: "center"
  })
};
