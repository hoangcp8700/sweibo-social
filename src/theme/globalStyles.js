import { withStyles } from "@mui/styles";

// ----------------------------------------------------------------------

const GlobalStyles = withStyles((theme) => ({
  "@global": {
    "*": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    },
    html: {
      width: "100%",
      height: "100%",
      scrollBehaviour: "smooth",
      "-ms-text-size-adjust": "100%",
      "-webkit-overflow-scrolling": "touch",
    },
    body: {
      width: "100%",
      height: "100%",
      outline: "none",
      background: theme.palette.background.main,

      "&::-webkit-scrollbar-track": {
        // boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
        borderRadius: "10px",
        backgroundColor: theme.palette.background.opacity,
      },

      "&::-webkit-scrollbar": {
        width: 10,
        backgroundColor: "transparent",
      },

      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.grey[500],
        borderRadius: "10px",
      },
    },
    "#root": {
      width: "100%",
      height: "100%",
    },
    input: {
      outline: "none",
      "&[type=number]": {
        MozAppearance: "textfield",
        "&::-webkit-outer-spin-button": { margin: 0, WebkitAppearance: "none" },
        "&::-webkit-inner-spin-button": { margin: 0, WebkitAppearance: "none" },
      },
    },
    textarea: {
      "&::-webkit-input-placeholder": { color: theme.palette.text.disabled },
      "&::-moz-placeholder": { opacity: 1, color: theme.palette.text.disabled },
      "&:-ms-input-placeholder": { color: theme.palette.text.disabled },
      "&::placeholder": { color: theme.palette.text.disabled },
    },
    a: { color: "#000", textDecoration: "none" },
    img: { display: "block", width: "100%", height: "100%" },

    // Lazy Load Img
    ".blur-up": {
      WebkitFilter: "blur(5px)",
      filter: "blur(5px)",
      transition: "filter 400ms, -webkit-filter 400ms",
    },
    ".blur-up.lazyloaded ": {
      WebkitFilter: "blur(0)",
      filter: "blur(0)",
    },
  },
}))(() => null);

export default GlobalStyles;
