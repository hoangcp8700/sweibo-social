import * as React from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  IconButton,
  DialogActions,
  Box,
} from "@mui/material";
import { MButton } from "components/MUI";
import { LoadingEllipsisElement, LoadingEllipsis } from "components";
import { useChat, useUser } from "hooks";

import { icons } from "constants";

export default function PopupCreateRoom(props) {
  const { onClose, open } = props;
  const { handleGetUserExeptToMe } = useUser();

  const [paginate, setPaginate] = React.useState([]); // search
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const handleGetUsersCustom = React.useCallback(
    async (params) => {
      setLoading(true);
      const response = await handleGetUserExeptToMe(1, params);
      console.log("handleGetUserExeptToMe", response);
      setLoading(false);

      const newData = response.map((item) => ({
        id: item?._id,
        fullName: `${item?.firstName} ${item?.lastName} (${item?.email})`,
      }));

      return setPaginate(newData);
    },
    [open, paginate, search]
  );

  React.useEffect(() => {
    if (!open) return;
    handleGetUsersCustom();
    return () => {
      setPaginate([]);
      setSearch("");
    };
  }, [open]);

  let timer;
  const handleSearch = (value) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      console.log("runnnn");
      handleGetUsersCustom(`&search=${search}`);
    }, 500);
  };
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
          minHeight: "47vh",
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
        <Stack
          sx={{
            "& .optionListContainer": {
              background: "transparent",
              "& .highlightOption ": { bgcolor: "primary.main" },
              "& li:hover": { bgcolor: "primary.main" },
            },
            "& .chip": { bgcolor: "primary.main" },
          }}
        >
          <Multiselect
            options={paginate}
            selectedValues={selected}
            onSelect={(value) => setSelected(value)}
            onRemove={(value) => setSelected(value)}
            onSearch={handleSearch}
            displayValue="fullName" // Property name to display in the dropdown options
            emptyRecordMsg="Không có dữ liệu!"
            loading={false}
            loadingMessage={
              <Box
                sx={{
                  "& .lds-ellipsis": {
                    height: 40,
                    "& div": { top: 18, width: 8, height: 8 },
                  },
                }}
              >
                <LoadingEllipsisElement />
              </Box>
            }
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
