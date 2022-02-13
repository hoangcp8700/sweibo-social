import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  border: "##E5E5E5",
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#EAEAEA;",
  300: "#C4C4C4",
  400: "#C4CDD5",
  500: "#909096",
  600: "#637381",
  700: "#454F5B",
  800: "#34373a",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const PRIMARY = {
  lighter: "#C8FACD",
  light: "#5BE584",
  main: "#00AB55",
  dark: "#007B55",
  darker: "#005249",
  contrastText: "#fff",
};

const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#fff",
};
const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
  contrastText: "#fff",
};
const SUCCESS = {
  lighter: "#D8F6DB",
  light: "#30D379",
  main: "#54D62C",
  dark: " #2BAA37",
  darker: "#08660D",
  contrastText: GREY[800],
};
const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
  contrastText: GREY[800],
};

const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
  darker: "#7A0C2E",
  contrastText: "#fff",
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
      reverse: "#fff",
      comment: GREY[900],
    },
    background: {
      paper: "#fff",
      default: "#fff",
      neutral: GREY[200],
      navbar: "#fff",
      main: GREY[100],
      opacity: `rgba(0,0,0,0.05)`,
      opacity1: `rgba(0,0,0,0.1)`,
      opacity2: `rgba(0,0,0,0.2)`,
    },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    text: {
      primary: "#fff",
      secondary: GREY[500],
      disabled: GREY[600],
      reverse: GREY[800],
      comment: GREY[200],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: GREY[500_16],
      navbar: "#323131",
      main: "#1c1E21",
      opacity: `rgba(255,255,255,0.1)`,
      opacity1: `rgba(255,255,255,0.2)`,
      opacity2: `rgba(255,255,255,0.3)`,
    },
    action: { active: GREY[500], ...COMMON.action },
  },
};

export default palette;
