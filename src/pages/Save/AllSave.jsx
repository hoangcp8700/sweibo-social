import React from "react";
import { Typography, Stack, Box } from "@mui/material";
import { SaveItem } from "components";

const AllSave = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          maxWidth: (theme) => theme.breakpoints.values.md,
          m: "0 auto",
          px: 2,
        }}
      >
        <Typography variant="h6">Tất cả</Typography>
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

export default AllSave;
