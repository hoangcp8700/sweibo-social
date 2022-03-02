import React from "react";
import queryString from "query-string";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Typography, Paper, Box, IconButton } from "@mui/material";
import { useAuth } from "hooks";
import { PATH_AUTH, PATH_PAGE } from "constants/paths";
import "components/Animation/bubble.css";
import { icons } from "constants";

const OAuth2 = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setSession } = useAuth();

  React.useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (!parsed?.token || !params?.provider || parsed.token.length < 150)
      return navigate(PATH_AUTH.login.path);
    setSession(parsed?.token);

    setTimeout(() => {
      navigate(PATH_PAGE.home.path);
    }, 1000);
  }, [params, location, navigate, setSession]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(90deg, rgba(167, 167, 255, 1) 0%, rgba(162, 186, 195, 1) 25%, rgba(91, 229, 132, 1) 50%, rgba(71, 195, 119, 1) 79%, rgba(0, 171, 85, 1) 100%)`,
        "& .bubble": {
          // background: `linear-gradient(#EC5DC1,#D61A6F)`,

          background: "rgba(255,255,255,0.3)",
          borderRadius: `50%`,
          boxShadow: `-2px 9px 22px 5px rgba(0,0,0,0.3)`,
          position: "absolute",
          "&:before ": {
            content: "''",
            // background: `linear-gradient(#EC5DC1,#D61A6F)`,
            background: "rgba(255,255,255,0.3)",
            borderRadius: `50%`,
            boxShadow: `-5px 9px 22px 5px rgba(0,0,0,0.2)`,
            position: "absolute",
          },

          "&:nth-of-type(1)": {
            height: "22vmin",
            width: "22vmin",
            animation: `animateBubble 20s linear infinite, sideWays 2s ease-in-out infinite alternate`,
            left: "-5%",
            top: "40%",
            transform: `scale(0.6)`,
            "&:before": {
              width: "13vmin",
              height: "13vmin",
              bottom: "-25vh",
              right: "-10vmin",
            },
          },
          "&:nth-of-type(2)": {
            height: "10vmin",
            width: "10vmin",
            animation: `animateBubble 35s linear infinite, sideWays 2s ease-in-out infinite alternate`,
            left: "14%",
            top: "40%",
            "&:before": {
              width: "5vmin",
              height: "5vmin",
              bottom: "-10vh",
              left: "-8vmin",
            },
          },
          "&:nth-of-type(3)": {
            height: "20vmin",
            width: "20vmin",
            animation: `animateBubble 15s linear infinite, sideWays 2s ease-in-out infinite alternate`,
            left: "27%",
            top: "40%",
            "&:before": {
              width: "3vmin",
              height: "3vmin",
              bottom: -"15vh",
              left: "-18vmin",
              zIndex: 6,
            },
          },
          "&:nth-of-type(4)": {
            height: "18vmin",
            width: "18vmin",
            animation: `animateBubble 40s linear infinite, sideWays 2s ease-in-out infinite alternate`,
            left: "40%",
            top: "40%",

            "&:before": {
              width: "7vmin",
              height: "7vmin",
              bottom: "-10vmin",
              left: "5vmin",
            },
          },
          "&:nth-of-type(5)": {
            height: "28vmin",
            width: "28vmin",
            animation: `animateBubble 20s linear infinite, sideWays 2s ease-in-out infinite alternate`,
            left: "55%",
            top: "40%",

            "&:before": {
              width: "10vmin",
              height: "10vmin",
              top: "100%",
              left: "-50%",
            },
          },
          "&:nth-of-type(6)": {
            height: "35vmin",
            width: "35vmin",
            animation: `animateBubble 55s linear infinite, sideWays 2s ease-in-out infinite alternate`,
            left: "69%",
            top: "40%",

            "&:before": {
              width: "10vmin",
              height: "10vmin",
              top: "100%",
              right: "-50%",
            },
          },
          "&:nth-of-type(7)": {
            height: "22vmin",
            width: "22vmin",
            animation: `animateBubble 25s linear infinite, sideWays 2s ease-in-out infinite alternate`,
            left: "89%",
            top: "40%",
            "&:before": {
              width: "18vmin",
              height: "18vmin",
              top: "100%",
              right: "-50%",
            },
          },
        },
      }}
    >
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <Box sx={{ textAlign: "center" }}>
        <IconButton
          sx={{
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.main",
            },
            "& svg": { fontSize: 64, fill: "#fff" },
          }}
        >
          {icons.DoneIcon}
        </IconButton>

        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: `"Fira Mono", monospace`,
            mt: 2,
          }}
        >
          Đăng nhập thành công
        </Typography>
      </Box>
    </Box>
  );
};

export default OAuth2;
