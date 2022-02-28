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
  TextField,
} from "@mui/material";
import { MButton } from "components/MUI";
import { LoadingEllipsis } from "components";
import { useUser } from "hooks";

import { icons } from "constants";

const initialize = {
  title: "",
  participants: [],
};

export default function PopupCreateRoom(props) {
  const { onClose, open, handleSubmitCreateRoom } = props;
  const { handleGetUserExeptToMe } = useUser();

  const [paginate, setPaginate] = React.useState([]); // search
  const [search, setSearch] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState(initialize);
  const [selected, setSelected] = React.useState([]);

  const handleGetUsersCustom = React.useCallback(
    async (params) => {
      const response = await handleGetUserExeptToMe(1, params);

      const newData = response.map((item) => ({
        id: item?._id,
        fullName: `${item?.firstName} ${item?.lastName} (${item?.email})`,
      }));

      return setPaginate([...newData, ...paginate]);
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
      handleGetUsersCustom(`&search=${value}`);
    }, 500);
  };

  const handleSubmitCreateRoomCustom = async () => {
    setIsSubmitting(true);
    const newparticipants = form.participants.map((item) => item?.id);
    await handleSubmitCreateRoom({
      ...form,
      participants: newparticipants,
    });

    setIsSubmitting(false);
    onClose();
    setForm(initialize);
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
          <Typography>Tạo nhóm chat</Typography>
          <IconButton sx={{ "& svg": { fontSize: 20 } }} onClick={onClose}>
            {icons.CloseIcon}
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 0,
          pb: 2,
          px: 3,
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
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">
              Tên nhóm ( Không băt buộc )
            </Typography>

            <TextField
              name="title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              sx={{
                "& input": { py: 1, fontSize: 14 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
              placeholder="Đặt tên nhóm"
            />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2">Những người sẽ tham gia</Typography>
            <Box
              sx={{
                "& .optionListContainer": {
                  background: "transparent",
                  "& .highlightOption ": { bgcolor: "primary.main" },
                  "& li:hover": { bgcolor: "primary.main" },
                },
                "& .searchWrapper ": { minHeight: 100 },
                "& .chip": { bgcolor: "primary.main" },
                "& .searchBox": { color: "text.primary", px: 1 },
              }}
            >
              <Multiselect
                options={paginate}
                selectedValues={form.participants}
                onSelect={(value) => setForm({ ...form, participants: value })}
                onRemove={(value) => setForm({ ...form, participants: value })}
                onSearch={handleSearch}
                displayValue="fullName" // Property name to display in the dropdown options
                emptyRecordMsg="Không có dữ liệu!"
                placeholder="Bạn muốn thêm ai?"
              />
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <Stack direction="row" spacing={0.5}>
          <MButton
            onClick={() => {
              onClose();
              setForm(initialize);
            }}
            variant="cancel"
            disabled={isSubmitting}
          >
            Hủy bỏ
          </MButton>
          <MButton
            onClick={handleSubmitCreateRoomCustom}
            variant="contained"
            loading={isSubmitting}
            disabled={isSubmitting || !form.participants.length}
          >
            Tạo
          </MButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
