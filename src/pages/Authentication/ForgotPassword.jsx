import React from "react";
import {
  Paper,
  Box,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { MButton } from "components/MUI";
import { icons } from "constants";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "constants/paths";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": { padding: theme.spacing(1.5, 3), fontSize: 14 },
}));

const initialize = {
  email: "",
};

const ForgotPassword = () => {
  const [form, setForm] = React.useState(initialize);

  const handleChangeForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Paper elevation={4}>
      <Box sx={{ px: 5, pb: 5, pt: 3 }}>
        <Stack>
          <Typography variant="h4">Quên mật khẩu</Typography>
          <Typography
            variant="body2"
            component={Link}
            to={PATH_AUTH.login.path}
            color="secondary"
            sx={{
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Đã có tài khoản? Đăng nhập
          </Typography>
        </Stack>

        <Stack spacing={2} sx={{ mt: 3 }}>
          <TextFieldStyle
            value={form.email}
            onChange={handleChangeForm}
            name="email"
            placeholder="Địa chỉ email "
          />

          <MButton variant="contained" sx={{ px: 5 }}>
            Gửi
          </MButton>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ForgotPassword;
