/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import anime from "animejs";
import { EditorState, RichUtils } from "draft-js";
import { css as eCss } from "emotion";
import { useState } from "react";
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

  return (
    <div
      css={[
        styles.body,
        {
          background: `linear-gradient(to right, ${palette.primary}, ${palette.secondary})`
        }
      ]}
    >
      <div css={styles.container}>
        <Box text="RICH TEXT">
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

      <p css={[styles.copy, { color: theme.text, backgroundColor: theme.fadedText }]}>
        &copy; 2020 Ravik Ganguly - source code on{" "}
        <a
          href="https://github.com/g-ravity/markdown-previewer"
          target="_blank"
          rel="noopener noreferrer"
          css={{ borderColor: theme.background, color: theme.background }}
        >
          github
        </a>
      </p>

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
    height: "100%",
    position: "relative",

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
    }
  }),

  logo: css({
    width: "30px",
    position: "absolute",
    right: 0,
    bottom: 0,

    "@media only screen and (min-width: 1024px)": {
      width: "50px"
    }
  }),

  copy: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "50px",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",

    a: {
      borderWidth: "2px",
      borderBottomStyle: "dotted",
      marginLeft: "5px"
    }
  }),

  btnContainer: css({
    position: "fixed",
    top: "0",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "15px 0",
    width: "50px",

    button: {
      marginBottom: "15px"
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
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  }),

  container: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "90%",
    margin: "0 auto",

    "@media only screen and (min-width: 1024px)": {
      flexDirection: "row"
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
