export interface Palette {
  primary: string;
  secondary: string;
  title: string;
}

export interface Theme {
  text: string;
  background: string;
  fadedText: string;
  fadedBackground: string;
  palette: Palette[];
}

export interface Mode {
  dark: Theme;
  light: Theme;
}

export const lightPalette: Palette[] = [
  {
    primary: "#ff416c",
    secondary: "#ff4b2b",
    title: "Burning Red"
  },

  {
    primary: "#7f00ff",
    secondary: "#e100ff",
    title: "Purpink"
  },

  {
    primary: "#396afc",
    secondary: "#2948ff",
    title: "Kimoby Blue"
  },

  {
    primary: "#56ab2f",
    secondary: "#a8e063",
    title: "Lush"
  },

  {
    primary: "#ffb347",
    secondary: "#ffcc33",
    title: "Pastel Orange"
  }
];

export const darkPalette: Palette[] = [
  {
    primary: "#6441A5",
    secondary: "#2a0845",
    title: "Twitch"
  },

  {
    primary: "#c31432",
    secondary: "#240b36",
    title: "Witching Red"
  },

  {
    primary: "#004e92",
    secondary: "#000428",
    title: "Frost"
  },

  {
    primary: "#093028",
    secondary: "#237A57",
    title: "Lake Green"
  },

  {
    primary: "#BA8B02",
    secondary: "#181818",
    title: "Dark Knight"
  }
];

export const mode: Mode = {
  dark: {
    text: "#ffffff",
    background: "#000000",
    fadedText: "rgba(255,255,255, 0.2)",
    fadedBackground: "rgba(0,0,0,0.3)",
    palette: darkPalette
  },

  light: {
    text: "#000000",
    background: "#ffffff",
    fadedBackground: "rgba(255,255,255, 0.2)",
    fadedText: "rgba(0,0,0,0.3)",
    palette: lightPalette
  }
};
