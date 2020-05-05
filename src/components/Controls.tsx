import React from "react";
import { Button, ButtonProps } from "./widgets";

const copy = () => {
  const output = document.getElementById("outputArea");
  if (output?.innerText) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("outputArea") as Node);
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
      selection.removeAllRanges();
    }
  } else alert("Empty Output!");
};

const download = () => {
  const output = document.getElementById("outputArea");
  if (output?.innerText) {
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(output.innerText)}`);
    element.setAttribute("download", "README.md");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  } else alert("Empty Output!");
};

// TODO: Implement Markdown Editing functionality
const CONTROL_BUTTONS: ButtonProps[] = [
  {
    label: "Edit",
    activeLabel: "Start Editing",
    onClick: () => console.log("Editing!")
  },
  {
    label: "Copy",
    activeLabel: "Copied!",
    onClick: copy
  },
  {
    label: "Download",
    activeLabel: "Downloaded!",
    onClick: download
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
