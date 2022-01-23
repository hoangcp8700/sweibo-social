import React from "react";
import {
  Box,
  IconButton,
  Paper,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { SaveItem, MenuActionSave } from "components";
import { icons } from "constants";

const CollectionSave = () => {
  const params = useParams();
  const dotRef = React.useRef(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleToggleAction = () => setOpenMenu(!openMenu);

  return (
    <Box sx={{ pb: 2 }}>
      <MenuActionSave
        anchor={dotRef}
        open={openMenu}
        handleClose={handleToggleAction}
      />
      <Paper sx={{ px: { xs: 3, sm: 5 } }}>
        <Box sx={{ height: { xs: 150, mobile: 200, sm: 400 } }}>
          <Avatar sx={{ width: "100%", height: "100%" }} variant="rounded" />
        </Box>
        <Stack
          sx={{ px: { xs: 1, sm: 3 }, py: { xs: 2, sm: 3 } }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="h5" component="span">
              Nhà cửa
            </Typography>
            <IconButton sx={{ "& svg": { fontSize: 18 } }}>
              {icons.PublicIcon}{" "}
            </IconButton>
          </Box>

          <IconButton
            sx={{ "& svg": { fontSize: 18 } }}
            ref={dotRef}
            onClick={handleToggleAction}
          >
            {icons.MoreHorizIcon}
          </IconButton>
        </Stack>
      </Paper>
      <Box
        sx={{
          maxWidth: (theme) => theme.breakpoints.values.md,
          m: "0 auto",
          px: 2,
          mt: 2,
        }}
      >
        <Stack sx={{ mt: 1, gap: 2 }}>
          <SaveItem />
          <SaveItem />
          <SaveItem />
          <SaveItem />
          <SaveItem />
        </Stack>
      </Box>
    </Box>
  );
};

export default CollectionSave;
