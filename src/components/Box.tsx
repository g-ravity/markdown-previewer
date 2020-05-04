/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ReactNode } from "react";
import { useThemeState } from "../context/ThemeContext";
import { getTheme } from "../utils";

/**
 * Types
 */
export interface BoxProps {
  text: "RICH TEXT" | "MARKDOWN";
  children: ReactNode[];
}

/**
 * Component
 */
const Box = (props: BoxProps) => {
  const { text, children } = props;
  const { mode } = useThemeState();

  const theme = getTheme(mode);

  return (
    <div css={[styles.box, { backgroundColor: theme.background, boxShadow: `15px 15px 0 ${theme.fadedBackground}` }]}>
      <div
        css={[
          { justifyContent: text === "MARKDOWN" ? "flex-end" : "flex-start", borderBottom: `2px solid ${theme.text}` },
          styles.btnContainer
        ]}
      >
        {children[0]}
      </div>

      {children.slice(1, children.length)}

      <p css={[styles.sidebar, { color: theme.text }]}>{text}</p>
    </div>
  );
};

/**
 * Styles
 */
const styles = {
  box: css({
    position: "relative",
    fontSize: "1.2em",
    width: "100%",
    height: "100vh",
    margin: "30px 0",
    display: "flex",
    flexDirection: "column",

    "@media only screen and (min-width: 1024px)": {
      width: "50%",
      height: "auto",
      margin: "0 50px"
    }
  }),

  btnContainer: css({
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    fontSize: "0.8em",
    userSelect: "none",
    flexWrap: "wrap"
  }),

  sidebar: css({
    position: "absolute",
    top: "-30px",
    left: "0px",
    fontSize: "1.2em",
    fontWeight: 700,

    "@media only screen and (min-width: 768px)": {
      fontSize: "1.5em",
      top: "-35px"
    },

    "@media only screen and (min-width: 1024px)": {
      bottom: "0px",
      left: "-50px",
      transform: "rotateZ(180deg)",
      writingMode: "vertical-lr",
      top: "unset",
      fontWeight: 400
    }
  })
};

export default Box;
