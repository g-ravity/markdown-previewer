/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import anime from "animejs";
import { EditorState, RichUtils } from "draft-js";
import { css as eCss } from "emotion";
import React, { FocusEvent, MouseEvent, useState } from "react";
import { Layers, Moon, Sun, XCircle } from "react-feather";
import { ThemeProvider, useThemeSetState, useThemeState } from "../context/ThemeContext";
import { darkPalette, lightPalette } from "../theme/theme";
import { getTheme, isDark } from "../utils";
import Box from "./Box";
import Controls from "./Controls";
import { BlockControls, InlineControls } from "./RichControls";
import RichEditor from "./RichEditor";
import { IconButton } from "./widgets";

/**
 * Component
 */
const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { mode, palette } = useThemeState();
  const setTheme = useThemeSetState();

  const theme = getTheme(mode);

  const toggleBlockType = (blockType: string): void => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string): void => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const slideAnime = (type: "in" | "out") => {
    anime({
      targets: `.${btnContainer}`,
      right: type === "in" ? "-100%" : "0%",
      easing: "spring(1, 50, 10, 5)"
    });

    anime({
      targets: `.${filter}`,
      right: type === "in" ? "0%" : "-100%",
      easing: "spring(1, 50, 10, 10)"
    });
  };

  const zoomAnime = (type: "in" | "out", elem: HTMLElement[]) => {
    anime({
      targets: elem[0],
      fontSize: type === "in" ? "2.5em" : "1.5em",
      easing: "spring(1, 80, 10, 0)"
    });

    anime({
      targets: elem[1],
      scale: type === "in" ? 1.5 : 1,
      easing: "spring(1, 80, 10, 0)"
    });
  };

  return (
    <div
      css={[
        styles.body,
        {
          background: `linear-gradient(to right, ${palette.primary}, ${palette.secondary})`
        }
      ]}
    >
      <div
        className={btnContainer}
        css={[styles.btnContainer, { backgroundColor: theme.fadedText, color: theme.text }]}
      >
        <IconButton
          icon={isDark(mode) ? Sun : Moon}
          onClick={() =>
            setTheme({
              mode: isDark(mode) ? "light" : "dark",
              palette: isDark(mode) ? lightPalette[0] : darkPalette[0]
            })
          }
          color={theme.text}
          title="Mode"
        />

        <IconButton icon={Layers} onClick={() => slideAnime("in")} color={theme.text} title="Palette" />
      </div>

      <div css={styles.container}>
        <Box text="RICH TEXT">
          <React.Fragment>
            <BlockControls editorState={editorState} onToggle={toggleBlockType} />
            <InlineControls editorState={editorState} onToggle={toggleInlineStyle} />
          </React.Fragment>

          <RichEditor editorState={editorState} setEditorState={setEditorState} />
        </Box>

        <Box text="MARKDOWN">
          <Controls />
          <div>Hey, here is your output. Cheers!</div>
        </Box>
      </div>

      <div css={[styles.copy, { color: theme.text, backgroundColor: theme.fadedText }]}>
        &copy; 2020 Ravik Ganguly - source code on{" "}
        <a
          href="https://github.com/g-ravity/markdown-previewer"
          target="_blank"
          rel="noopener noreferrer"
          css={{ borderColor: theme.background, color: theme.background }}
        >
          github
        </a>
      </div>

      <img src={`/logo512${isDark(mode) ? "" : "-light"}.png`} alt="Markdown Logo" css={styles.logo} />

      <div css={[styles.filter, { backgroundColor: theme.fadedText }]} className={filter}>
        <div css={[styles.paletteContainer, { backgroundColor: theme.background }]}>
          {theme.palette.map(elem => (
            <button
              type="button"
              key={elem.title}
              css={[
                styles.colorRow,
                {
                  color: theme.text
                }
              ]}
              onMouseOver={(e: MouseEvent) =>
                zoomAnime("in", [e.target as HTMLElement, (e.target as HTMLElement).firstChild as HTMLElement])
              }
              onMouseOut={(e: MouseEvent) =>
                zoomAnime("out", [e.target as HTMLElement, (e.target as HTMLElement).firstChild as HTMLElement])
              }
              onFocus={(e: FocusEvent<HTMLButtonElement>) =>
                zoomAnime("in", [e.target as HTMLElement, (e.target as HTMLElement).firstChild as HTMLElement])
              }
              onBlur={(e: FocusEvent<HTMLButtonElement>) =>
                zoomAnime("out", [e.target as HTMLElement, (e.target as HTMLElement).firstChild as HTMLElement])
              }
              onClick={() => {
                setTheme({ mode, palette: elem });
                slideAnime("out");
              }}
            >
              <div css={[styles.colorBox, { backgroundColor: elem.primary, border: `2px solid ${theme.text}` }]} />
              {elem.title}
            </button>
          ))}
        </div>

        <IconButton
          style={styles.cancelFilter}
          icon={XCircle}
          onClick={() => slideAnime("out")}
          color={theme.text}
          size={4}
        />
      </div>
    </div>
  );
};

/**
 * Styles
 */
const styles = {
  body: css({
    width: "100%",
    position: "relative",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",

    button: {
      background: "none",
      border: "none",
      cursor: "pointer",

      ":focus": {
        outline: 0
      }
    },

    a: {
      textDecoration: "none",

      ":focus": {
        outline: 0
      }
    },

    "@media only screen and (min-width: 1024px)": {
      overflow: "hidden",
      height: "100vh"
    }
  }),

  container: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "90%",
    margin: "0 auto",
    padding: "30px 0",
    boxSizing: "border-box",
    overflowX: "hidden",

    "@media only screen and (min-width: 1024px)": {
      flexDirection: "row",
      overflow: "hidden",
      height: "100%"
    }
  }),

  logo: css({
    position: "absolute",
    right: 0,
    bottom: 0,
    display: "none",

    "@media only screen and (min-width: 1024px)": {
      width: "50px",
      display: "inline"
    }
  }),

  copy: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    bottom: 0,
    width: "100%",

    a: {
      borderWidth: "2px",
      borderBottomStyle: "dotted",
      marginLeft: "5px"
    }
  }),

  btnContainer: css({
    display: "flex",
    justifyContent: "flex-start",
    padding: "5px 0",
    width: "100%",

    button: {
      marginLeft: "15px"
    },

    "@media only screen and (min-width: 1024px)": {
      width: "50px",
      padding: "15px 0",
      flexDirection: "column",
      height: "100%",
      position: "fixed",
      top: "0",

      button: {
        marginBottom: "15px",
        marginLeft: 0
      }
    }
  }),

  filter: css({
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: 0
  }),

  paletteContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    position: "absolute",
    top: 0,
    height: "100vh",
    padding: "0 35px",
    right: 0
  }),

  colorRow: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1.5em"
  }),

  colorBox: css({
    width: "30px",
    height: "30px",
    marginRight: "10px"
  }),

  cancelFilter: css({
    position: "absolute",
    bottom: 0,

    "@media only screen and (min-width: 1024px)": {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      bottom: "unset"
    }
  })
};

const filter = eCss`
  right: -100%;
`;

const btnContainer = eCss`
  right: 0;
`;

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
