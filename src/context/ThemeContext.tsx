import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { darkPalette, Mode, Palette } from "../theme/theme";

/**
 * Types
 */
export type State = {
  mode: keyof Mode;
  palette: Palette;
};
export type SetState = Dispatch<SetStateAction<State>>;

/**
 * Hooks
 */
const ThemeStateContext = createContext<State | undefined>(undefined);
const ThemeSetStateContext = createContext<SetState | undefined>(undefined);

export const useThemeState = () => {
  const context = useContext(ThemeStateContext);
  if (context === undefined) {
    throw new Error("useThemeState must be used within a ThemeProvider");
  }
  return context;
};

export const useThemeSetState = () => {
  const context = useContext(ThemeSetStateContext);
  if (context === undefined) {
    throw new Error("useThemeSetState must be used within a ThemeProvider");
  }
  return context;
};

/**
 * Provider
 */
export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<State>({ mode: "dark", palette: darkPalette[0] });

  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeSetStateContext.Provider value={setTheme}>{children}</ThemeSetStateContext.Provider>
    </ThemeStateContext.Provider>
  );
};
