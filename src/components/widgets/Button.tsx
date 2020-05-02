/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";

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

  return (
    <span
      css={[styles.button, { color: active ? "#5890ff" : "#999" }]}
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
