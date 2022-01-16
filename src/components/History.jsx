import React from "react";
import {
  Paper,
  IconButton,
  Stack,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { lineClampStyle } from "utils/lineClampStyle";
import { icons } from "constants";

const HistoryItem = ({ item }) => {
  return (
    <Box>
      <Stack alignItems="center">
        <Avatar
          src={item.avatar}
          sx={{
            width: 80,
            height: 80,
            border: (theme) => `5px solid ${theme.palette.primary.main}`,
            "& img": { borderRadius: "50%" },
          }}
        />
        <Typography
          variant="body2"
          sx={{ ...lineClampStyle(2), textAlign: "center" }}
        >
          {item.name}
        </Typography>
      </Stack>
    </Box>
  );
};

const HistoryItemMe = ({ item }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Stack alignItems="center" spacing={1}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            border: (theme) => `5px solid ${theme.palette.primary.main}`,
            "& img": { borderRadius: "50%" },
          }}
        />
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Tạo tin
        </Typography>

        <Box sx={{ position: "absolute", bottom: 20 }}>
          <IconButton
            sx={{
              "& svg": {
                fontSize: 16,
                fill: (theme) => theme.palette.common.white,
              },
              bgcolor: "primary.main",
              p: 0.5,
              "&:hover": {
                bgcolor: "primary.main",
              },
            }}
          >
            {icons.AddIcon}{" "}
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};
const History = (props) => {
  const { users } = props;

  const slideRef = React.useRef(null);

  return (
    <Paper
      sx={{
        py: 2,
        position: "relative",
        bgcolor: "background.navbar",
        borderRadius: (theme) => theme.sizes.minBase,
      }}
    >
      <Stack
        ref={slideRef}
        direction="row"
        spacing={2}
        alignItems="flex-start"
        sx={{
          pl: 2,
          overflow: "auto",
          scrollBehavior: "smooth",
          m: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <HistoryItemMe />
        {users?.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </Stack>

      <Box
        sx={{
          position: "absolute",
          left: -15,
          top: 50,
        }}
      >
        <IconButton
          onClick={(e) => {
            slideRef.current.scrollLeft -= 400;
          }}
          sx={{
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.shadows[2],
            "&:hover": { bgcolor: "background.paper" },
            "& svg": { fontSize: 18 },
          }}
        >
          {icons.ArrowLeftIcon}{" "}
        </IconButton>
      </Box>

      <Box sx={{ position: "absolute", right: -15, top: 50 }}>
        <IconButton
          onClick={(e) => {
            slideRef.current.scrollLeft += 400;
          }}
          sx={{
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.shadows[2],
            "&:hover": { bgcolor: "background.paper" },
            "& svg": { fontSize: 18 },
          }}
        >
          {icons.ArrowRightIcon}{" "}
        </IconButton>
      </Box>
    </Paper>
  );
};

export default History;
