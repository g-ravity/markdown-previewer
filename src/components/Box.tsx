/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ReactNode } from "react";

/**
 * Types
 */
export interface BoxProps {
  text: "EDITOR" | "MARKDOWN";
  children: ReactNode[];
}

/**
 * Component
 */
const Box = (props: BoxProps) => {
  const { text, children } = props;

  return (
    <div css={styles.box}>
      <div css={styles.btnContainer} style={{ justifyContent: text === "MARKDOWN" ? "flex-end" : "" }}>
        {children[0]}
      </div>
      {children.slice(1, children.length)}
      <p css={styles.sidebar}>{text}</p>
    </div>
  );
};

/**
 * Styles
 */
const styles = {
  box: css({
    position: "relative",
    fontSize: "1.2rem",
    flexBasis: "100%",
    height: "90vh",
    margin: "50px",
    background: "white",
    boxShadow: "10px 10px 0px rgba(81, 0, 128, 1)"
  }),

  btnContainer: css({
    borderBottom: "2px solid #e3e3e3",
    display: "flex",
    height: "40px"
  }),

  sidebar: css({
    position: "absolute",
    bottom: "70px",
    left: "-100px",
    transform: "rotateZ(-90deg)",
    color: "white",
    fontSize: "1.5rem"
  })
};

export default Box;
