import { useMemo, ReactNode } from "react";
// material
import { CssBaseline, Shadows } from "@mui/material";
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
//
import palette from "./palette";
import typography from "./typography";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";

export interface ThemeProps {
  children: ReactNode;
}

export interface Color {
  500_8: string;
  500_12: string;
  500_16: string;
  500_24: string;
  500_32: string;
  500_48: string;
  500_56: string;
  500_80: string;
}

interface MyTheme {
  shadows?: Shadows;
  customShadows?: any;
}

interface MyPalette {
  [key: string]: any;
  chart: any;
  myGrey: Color;
}

declare module "@mui/material/styles" {
  interface DefaultTheme extends MyTheme {}
  interface Theme extends MyTheme {}
  interface ThemeOptions extends MyTheme {}
  interface Palette extends MyPalette {}
  interface PaletteOptions extends MyPalette {}
}

export default function ThemeProvider(props: ThemeProps) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
