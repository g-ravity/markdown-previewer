/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import { useThemeState } from "../../context/ThemeContext";
import { getTheme } from "../../utils";

/**
 * Types
 */
export interface ButtonProps {
  label: string;
  activeLabel: string;
  onClick: () => void;
}

/**
 * Component
 */
export const Button = (props: ButtonProps) => {
  const { label, activeLabel, onClick } = props;
  const [active, setActive] = useState(false);
  const { mode, palette } = useThemeState();

  const theme = getTheme(mode);

  return (
    <span
      css={[styles.button, { color: active ? palette.primary : theme.text, fontSize: active ? "1.2em" : "" }]}
      onClick={() => {
        setActive(!active);
        onClick();
      }}
    >
      {active ? activeLabel : label}
    </span>
  );
};

/**
 * Styles
 */
const styles = {
  button: css({
    cursor: "pointer",
    marginRight: "16px",
    padding: "2px 0",
    display: "inline-block"
  })
};
