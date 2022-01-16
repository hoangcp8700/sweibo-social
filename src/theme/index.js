import { useMemo } from "react";
// material
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";

// hooks dark mode
// import useSettings from 'hooks/useSettings'

import sizes from "./sizes";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import shadows, { customShadows } from "./shadows";
import GlobalStyles from "./globalStyles";
// import componentsOverride from './overrides'

// ----------------------------------------------------------------------

export default function ThemeConfig({ children, darkMode }) {
  const themeOptions = useMemo(
    () => ({
      palette: !darkMode
        ? { ...palette.light, mode: "light" }
        : { ...palette.dark, mode: "dark" },
      sizes,
      typography,
      breakpoints,
      shadows: !darkMode ? shadows.light : shadows.dark,
      customShadows: !darkMode ? customShadows.light : customShadows.dark,
    }),
    [darkMode]
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
