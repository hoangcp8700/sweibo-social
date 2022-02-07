import React from "react";
import {
  Paper,
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  styled,
} from "@mui/material";
import { MButton } from "components/MUI";
import { icons } from "constants";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": { padding: theme.spacing(1.5, 3), fontSize: 14 },
}));

const Login = () => {
  const [form, setForm] = React.useState({ email: "", password: "" });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleChangeForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <Paper>
      <Box sx={{ px: 5, pb: 5, pt: 3 }}>
        <Typography sx={{ textAlign: "center" }} variant="h4">
          Đăng nhập
        </Typography>

        <Stack spacing={2} sx={{ mt: 3 }}>
          <TextFieldStyle
            value={form.email}
            onChange={handleChangeForm}
            name="email"
            placeholder="Địa chỉ email"
          />

          <TextFieldStyle
            value={form.password}
            onChange={handleChangeForm}
            name="password"
            type={showPassword ? "string" : "password"}
            placeholder="Mật khẩu"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{
                      "& svg": {
                        fontSize: 20,
                        fill: (theme) => theme.palette.background.opacity3,
                      },
                    }}
                  >
                    {showPassword ? icons.EyeOnIcon : icons.EyeOffIcon}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack>
          <Typography variant="subtitle2">Quên mật khẩu?</Typography>
        </Stack>
        <MButton variant="contained">Đăng nhập</MButton>
      </Box>
    </Paper>
  );
};

export default Login;
