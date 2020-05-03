import { darkPalette, lightPalette, Mode, mode as theme, Palette, Theme } from "../theme/theme";

export const isDark = (mode: keyof Mode): boolean => mode === "dark";
export const isLight = (mode: keyof Mode): boolean => mode === "light";
export const getPalette = (mode: keyof Mode): Palette[] => (mode === "dark" ? darkPalette : lightPalette);
export const getTheme = (mode: keyof Mode): Theme => (mode === "dark" ? theme.dark : theme.light);
