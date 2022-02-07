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
  Divider,
} from "@mui/material";
import { MButton } from "components/MUI";
import { icons } from "constants";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "constants/paths";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": { padding: theme.spacing(1.5, 3), fontSize: 14 },
}));

const ButtonSocial = ({ icon, title }) => {
  return (
    <MButton startIcon={icon} sx={{ py: 1.5 }}>
      <Typography variant="subtitle2" sx={{ color: "common.black" }}>
        {title}
      </Typography>
    </MButton>
  );
};
const Login = () => {
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChangeForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Paper elevation={4}>
      <Box sx={{ px: 5, pb: 5, pt: 3 }}>
        <Stack>
          <Typography variant="h4">Đăng nhập</Typography>
          <Typography
            variant="body2"
            component={Link}
            to={PATH_AUTH.register.path}
            color="secondary"
            sx={{
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Chưa có tài khoản? Đăng ký ngay
          </Typography>
        </Stack>

        <Stack spacing={2} sx={{ mt: 3 }}>
          <TextFieldStyle
            value={form.email}
            onChange={handleChangeForm}
            name="email"
            placeholder="Địa chỉ email hoặc số điện thoại"
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

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2, mb: 1 }}
        >
          <MButton variant="contained" sx={{ px: 5 }}>
            Đăng nhập
          </MButton>

          <Typography
            variant="body2"
            component={Link}
            to={PATH_AUTH.forgotPassword.path}
            color="secondary"
            sx={{ "&:hover": { textDecoration: "underline" } }}
          >
            Quên mật khẩu?
          </Typography>
        </Stack>

        <Divider>
          <Typography variant="caption">Hoặc</Typography>
        </Divider>

        <Stack sx={{ justifyContent: "flex-start", mt: 1 }}>
          <ButtonSocial
            icon={icons.GoogleIcon}
            title=" Đăng nhập với tài khoản Google"
          />
          <ButtonSocial
            icon={icons.FacebookIcon}
            title=" Đăng nhập với tài khoản Facebook"
          />
          <ButtonSocial
            icon={icons.GitHubIcon}
            title=" Đăng nhập với tài khoản Github"
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default Login;
