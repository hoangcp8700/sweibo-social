import * as React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  styled,
  InputAdornment,
  IconButton,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { MButton, MSelect } from "components/MUI";
import { icons, data } from "constants";

const initialize = {
  bio: "",
  school: "",
  address: "",
  relationshipStatus: "",
  favorites: [],
};

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": { padding: theme.spacing(1.5, 3), fontSize: 14 },
}));

const FormControlCustom = (props) => {
  const { label, sx, children } = props;
  return (
    <Stack spacing={0.5} sx={sx}>
      <Typography variant="subtitle2">{label}</Typography>
      {children}
    </Stack>
  );
};

const TextFieldCustom = (props) => {
  const { icon, sx, ...restProps } = props;
  return (
    <TextFieldStyle
      {...restProps}
      sx={{
        "& .MuiOutlinedInput-root": {
          pr: 2,
        },
        "& .MuiOutlinedInput-input": {
          px: 0,
        },
        ...sx,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              sx={{
                "& svg": {
                  fontSize: 20,
                  fill: (theme) => theme.palette.text.primary,
                },
              }}
            >
              {icon}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default function PopupEditProfile(props) {
  const { onClose, open, onSubmit, userContact } = props;
  const [form, setForm] = React.useState(initialize);

  React.useEffect(() => {
    if (!open) return;
    setForm({
      bio: userContact?.bio,
      school: userContact?.school,
      address: userContact?.address,
      relationshipStatus: userContact?.relationshipStatus,
      favorites: userContact?.favorites,
    });
  }, [open]);

  const handleChangeForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle>Ch???nh s???a th??ng tin c?? nh??n</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2}>
          <FormControlCustom label="Nh???t k??">
            <TextFieldCustom
              value={form.bio}
              onChange={handleChangeForm}
              name="bio"
              placeholder="Nh???t k??"
              minRows={2}
              multiline
              maxRows={4}
              sx={{
                "& textarea": { fontSize: 14 },
                "& .MuiOutlinedInput-root": { py: 1.25 },
              }}
              icon={icons.NoteAltOutlinedIcon}
            />
          </FormControlCustom>

          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <FormControlCustom label="Tr?????ng h???c" sx={{ flex: 1 }}>
              <TextFieldCustom
                value={form.school}
                onChange={handleChangeForm}
                name="school"
                placeholder="Tr?????ng h???c"
                icon={icons.SchoolOutlinedIcon}
              />
            </FormControlCustom>

            <FormControlCustom label="Th??nh ph??? / T???nh" sx={{ flex: 1 }}>
              <MSelect
                name="address"
                placeholder="B???n ?????n t??? ????u?"
                lists={data.provinces}
                value={form?.address}
                onChange={handleChangeForm}
                sx={{
                  "& .MuiSelect-select": { py: 1.5, px: 3 },
                  "& svg": {
                    fontSize: `20px!important`,
                    fill: (theme) => theme.palette.text.primary,
                  },
                  "& .MuiButtonBase-root": { mr: 2 },
                }}
              />
            </FormControlCustom>
          </Stack>

          <FormControlCustom label="T??nh tr???ng quan h???">
            <MSelect
              name="relationshipStatus"
              placeholder="T??nh tr???ng quan h???"
              lists={data.relationshipStatus}
              value={form?.relationshipStatus}
              onChange={handleChangeForm}
              sx={{
                "& .MuiSelect-select": { py: 1.5, px: 3 },
                "& svg": {
                  fontSize: `20px!important`,
                  fill: (theme) => theme.palette.text.primary,
                },
                "& .MuiButtonBase-root": { mr: 2 },
              }}
            />
          </FormControlCustom>

          <FormControlCustom label="S??? th??ch">
            <MSelect
              multiple
              name="favorites"
              placeholder="S??? th??ch"
              lists={data.favorites}
              value={form?.favorites}
              onChange={handleChangeForm}
              sx={{
                "& .MuiSelect-select": { py: 1.5, px: 3 },
                "& svg": {
                  fontSize: `20px!important`,
                  fill: (theme) => theme.palette.text.primary,
                },
                "& .MuiButtonBase-root": { mr: 0.5, mt: -0.5 },
              }}
            />
          </FormControlCustom>
        </Stack>
      </DialogContent>

      <DialogActions>
        <MButton variant="cancel" onClick={onClose}>
          H???y b???
        </MButton>
        <MButton
          variant="contained"
          color="primary"
          onClick={() => onSubmit(form)}
        >
          Ch???nh s???a
        </MButton>
      </DialogActions>
    </Dialog>
  );
}
