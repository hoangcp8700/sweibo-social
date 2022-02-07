import React from "react";
import { SnackbarProvider } from "notistack";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// material
import { makeStyles } from "@mui/styles";
import { Box, SvgIcon, IconButton } from "@mui/material";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const isLight = theme.palette.mode === "light";

  const createStyle = {
    color: `${theme.palette.text.primary} `,
    backgroundColor: `${theme.palette.background.paper} `,
  };

  return {
    containerRoot: {
      "& .MuiCollapse-wrapperInner": {
        width: "100%",
      },
    },
    contentRoot: {
      width: "100%",
      padding: theme.spacing(1.5),
      margin: theme.spacing(0.25, 0),
      boxShadow: theme.customShadows.z8,
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.grey[isLight ? 0 : 800],
      backgroundColor: theme.palette.grey[isLight ? 900 : 0],
    },
    message: {
      padding: 0,
      fontWeight: theme.typography.fontWeightMedium,
    },
    action: {
      marginRight: -4,
      "& svg": {
        width: 20,
        height: 20,
        opacity: 0.48,
        "&:hover": { opacity: 1 },
      },
    },
    info: { ...createStyle },
    success: { ...createStyle },
    warning: { ...createStyle },
    error: { ...createStyle },
  };
});

// ----------------------------------------------------------------------

// SnackbarIcon.propTypes = {
//   icon: PropTypes.object,
//   color: PropTypes.string,
// }

function SnackbarIcon({ icon, color }) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "center",
        color: `#fff`,
        bgcolor: `rgba(255,255,255,0.1)`,
      }}
    >
      <SvgIcon component={icon} sx={{ width: 24, height: 24 }} />
    </Box>
  );
}

export default function NotistackProvider({ children }) {
  const classes = useStyles();
  const notistackRef = React.createRef();

  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      dense
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      iconVariant={{
        success: <SnackbarIcon icon={CheckCircleIcon} color="success" />,
        error: <SnackbarIcon icon={ErrorIcon} color="error" />,
        warning: <SnackbarIcon icon={WarningIcon} color="warning" />,
        info: <SnackbarIcon icon={WarningIcon} color="info" />,
      }}
      classes={{
        containerRoot: classes.containerRoot,
        contentRoot: classes.contentRoot,
        message: classes.message,
        action: classes.action,
        variantInfo: classes.info,
        variantSuccess: classes.success,
        variantWarning: classes.warning,
        variantError: classes.error,
      }}
      ref={notistackRef}
      action={(key) => (
        <IconButton
          onClick={onClickDismiss(key)}
          sx={{ "& svg": { fill: "#fff" } }}
        >
          <HighlightOffIcon />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
}
