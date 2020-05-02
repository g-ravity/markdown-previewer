import React from "react";
import { Button, ButtonProps } from "./widgets";

const CONTROL_BUTTONS: ButtonProps[] = [
  {
    label: "Edit",
    activeLabel: "Start Editing",
    onClick: () => console.log("Editing!")
  },
  {
    label: "Copy",
    activeLabel: "Copied!",
    onClick: () => console.log("Content is Copied!")
  },
  {
    label: "Download",
    activeLabel: "Downloaded!",
    onClick: () => console.log("Content is Downloaded!")
  }
];

const Controls = () => (
  <>
    {CONTROL_BUTTONS.map(button => (
      <Button key={button.label} {...button} />
    ))}
  </>
);

export default Controls;
