import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Button, styled, alpha, CircularProgress } from "@mui/material";

// ----------------------------------------------------------------------

const ButtonStyle = styled(Button)(({ theme, styleProps }) => {
  const { color, variant } = styleProps;

  const styleContained = (color) => ({
    boxShadow: theme.customShadows[color].main,
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
    "&:hover": {
      backgroundColor: theme.palette[color].dark,
    },
    "& .MuiIcon-root": {
      filter: `invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)`,
    },
  });

  const styleOutlined = (color) => ({
    color: theme.palette[color].main,
    border: `1px solid ${alpha(theme.palette[color].main, 0.48)}`,
    "&:hover": {
      border: `1px solid ${theme.palette[color].main}`,
      backgroundColor: alpha(
        theme.palette[color].main,
        theme.palette.action.hoverOpacity
      ),
    },
  });

  const styleText = (color) => ({
    color: theme.palette[color].main,
  });

  const styleCancel = () => ({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.opacity2,
    "&:hover": {
      color: theme.palette.text.primary,
    },
  });

  return {
    textTransform: "inherit",

    ...(variant === "contained" && { ...styleContained(color) }),
    ...(variant === "outlined" && { ...styleOutlined(color) }),
    ...(variant === "text" && { ...styleText(color) }),
    ...(variant === "cancel" && { ...styleCancel(color) }),
  };
});

// ----------------------------------------------------------------------

const MButton = forwardRef(
  ({ color = "primary", variant = "text", children, ...props }, ref) => {
    const { loading, loadingStyle, ...others } = props;
    return (
      <ButtonStyle
        ref={ref}
        variant={variant}
        styleProps={{ color, variant }}
        {...others}
      >
        {loading ? (
          <CircularProgress
            size={18}
            sx={{ mr: 1, color: "common.white", ...loadingStyle }}
          />
        ) : (
          ""
        )}

        {children}
      </ButtonStyle>
    );
  }
);

MButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ]),
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(["contained", "outlined", "text"]),
    PropTypes.string,
  ]),
};

export default MButton;
