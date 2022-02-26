import * as React from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Divider,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  DialogActions,
} from "@mui/material";

import { MButton } from "components/MUI";
import { LoadingEllipsisElement, LoadingEllipsis } from "components";
import { useChat } from "hooks";

import { icons } from "constants";

const initialize = {
  page: 1,
  hasNextPage: true,
  data: [
    { name: "Option 1️⃣", id: 1 },
    { name: "Option 2️⃣", id: 2 },
  ],
  totalLength: 0,
};

export default function PopupCreateRoom(props) {
  const { onClose, open } = props;

  const [paginate, setPaginate] = React.useState(initialize); // search
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"mobile"}>
      {isSubmitting ? (
        <LoadingEllipsis sx={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      ) : (
        ""
      )}

      <DialogTitle>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>Tạo nhóm</Typography>
          <IconButton sx={{ "& svg": { fontSize: 20 } }} onClick={onClose}>
            {icons.CloseIcon}
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 0,
          pb: 2,
          "&::-webkit-scrollbar-track": {
            // boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
            borderRadius: "10px",
            bgcolor: (theme) => theme.palette.background.opacity,
          },

          "&::-webkit-scrollbar": {
            width: 15,
            backgroundColor: "transparent",
          },

          "&::-webkit-scrollbar-thumb": {
            bgcolor: (theme) => theme.palette.grey[500],
            borderRadius: "10px",
          },
        }}
      >
        <Stack>
          <Multiselect
            options={paginate.data} // Options to display in the dropdown
            selectedValues={selected} // Preselected value to persist in dropdown
            onSelect={(e) => console.log("select ", e)} // Function will trigger on select event
            onRemove={(e) => console.log("onRemove ", e)} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <MButton
          // onClick={handleSubmitAddMemberCustom}
          variant="contained"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Tạo
        </MButton>
      </DialogActions>
    </Dialog>
  );
}
