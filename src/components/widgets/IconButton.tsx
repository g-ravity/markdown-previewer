/** @jsx jsx */
import { jsx, SerializedStyles } from "@emotion/core";
import React from "react";
import { Icon } from "react-feather";

/**
 * Types
 */
export interface IconProps {
  icon: Icon;
  color?: string;
  size?: number;
  onClick: () => void;
  title?: string;
  style?: SerializedStyles;
}

/**
 * Component
 */
export const IconButton = (props: IconProps) => {
  const { icon, color, size, onClick, title, style } = props;

  return (
    <button css={style} type="button" title={title} onClick={onClick}>
      {React.createElement(icon, { color, size: size && size * 24 })}
    </button>
  );
};
