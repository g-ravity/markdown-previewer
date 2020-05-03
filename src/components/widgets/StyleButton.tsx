/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { MouseEvent } from "react";
import { useThemeState } from "../../context/ThemeContext";
import { getTheme } from "../../utils";

/**
 * Types
 */
export interface StyleButtonProps {
  active: boolean;
  onToggle: (style: string) => void;
  label: string;
  style: string;
}

/**
 * Component
 */
export const StyleButton = (props: StyleButtonProps) => {
  const { active, onToggle, label, style } = props;
  const { mode, palette } = useThemeState();

  const theme = getTheme(mode);

  const onStyleToggle = (e: MouseEvent) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <span
      css={[styles.button, { color: active ? palette.primary : theme.text, fontSize: active ? "1.2em" : "" }]}
      onMouseDown={onStyleToggle}
    >
      {label}
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
