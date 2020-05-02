/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { EditorState, RichUtils } from "draft-js";
import { useState } from "react";
import Box from "./Box";
import Controls from "./Controls";
import { BlockControls, InlineControls } from "./RichControls";
import RichEditor from "./RichEditor";

/**
 * Component
 */
const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const toggleBlockType = (blockType: string): void => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string): void => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <div css={styles.container}>
      <Box text="EDITOR">
        <div>
          <BlockControls editorState={editorState} onToggle={toggleBlockType} />
          <InlineControls editorState={editorState} onToggle={toggleInlineStyle} />
        </div>
        <RichEditor editorState={editorState} setEditorState={setEditorState} />
      </Box>

      <Box text="MARKDOWN">
        <Controls />
        <div>Hey, here is your output. Cheers!</div>
      </Box>
    </div>
  );
};

/**
 * Styles
 */
const styles = {
  container: css({
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    margin: "0 auto"
  })
};

export default App;
