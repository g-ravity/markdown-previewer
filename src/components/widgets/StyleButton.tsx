/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { MouseEvent } from "react";

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

  const onStyleToggle = (e: MouseEvent) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <span css={[styles.button, { color: active ? "#5890ff" : "#999" }]} onMouseDown={onStyleToggle}>
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
