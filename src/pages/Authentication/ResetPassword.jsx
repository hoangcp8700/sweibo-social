import React from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

import { useFormik, Form, FormikProvider } from "formik";
import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  styled,
  Chip,
} from "@mui/material";
import { MButton } from "components/MUI";
import { icons } from "constants";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { PATH_AUTH } from "constants/paths";

import { useAuth } from "hooks";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": { padding: theme.spacing(1.5, 3), fontSize: 14 },
}));

const initialize = {
  password: "",
  passwordConfirmation: "",
};

const schema = Yup.object().shape({
  password: Yup.string()
    .required("Yêu cầu nhập mật khẩu")
    .min(6, "Mật khẩu ít nhất 6 kí tự")
    .max(50, "Mật khẩu tối đa 50 kí tự"),
  passwordConfirmation: Yup.string()
    .required("Yêu cầu nhập lại mật khẩu")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const { handleResetPassword } = useAuth();

  const [isReset, setIsReset] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!location?.state?.email || !params?.token || params.token.length < 150)
      return navigate(PATH_AUTH.login.path);

    setIsReset(true);
    return () => setIsReset(false);
  }, [params, location, navigate]);

  const formik = useFormik({
    initialValues: initialize,
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      try {
        setIsSubmitting(true);
        const { setErrors } = actions;
        const { passwordConfirmation, ...restForm } = values;

        const response = await handleResetPassword({
          ...restForm,
          email: location?.state?.email,
          token: params?.token,
        });

        setIsSubmitting(false);

        if (response.error) {
          formik.resetForm({
            values: { ...values, password: "", passwordConfirmation: "" },
          });
          return setErrors({ afterSubmit: response.error });
        }
        enqueueSnackbar("Đổi mật khẩu thành công", {
          variant: "success",
        });
        formik.resetForm({ values: initialize });
        navigate(PATH_AUTH.login.path);
      } catch (error) {
        console.log("err 123", error);
      }
    },
  });
  const { errors, values, touched, handleSubmit, getFieldProps } = formik;

  if (!isReset) {
    return <div></div>;
  }

  return (
    <Box sx={{ px: 5, pb: 5, pt: 3 }}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box sx={{ width: "fit-content" }}>
          <Typography variant="h4" sx={{ mb: -0.5 }}>
            Reset mật khẩu
          </Typography>
          <Typography variant="body2" color="secondary">
            Bước cuối cùng để bạn lấy lấy lại được tài khoản
          </Typography>
        </Box>
      </Stack>

      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          {errors && errors?.afterSubmit ? (
            <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
              <Chip
                label={errors?.afterSubmit.message}
                size="small"
                color="error"
              />
            </Stack>
          ) : null}

          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="body2" component="span">
                Email:{" "}
              </Typography>
              <Typography variant="subtitle2" component="span">
                {location.state.email}
              </Typography>
            </Box>
            <TextFieldStyle
              value={values.password}
              name="password"
              type={showPassword ? "string" : "password"}
              placeholder="Mật khẩu"
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
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

            <TextFieldStyle
              value={values.passwordConfirmation}
              type={showPassword2 ? "string" : "password"}
              placeholder="Nhập lại mật khẩu"
              {...getFieldProps("passwordConfirmation")}
              error={Boolean(
                touched.passwordConfirmation && errors.passwordConfirmation
              )}
              helperText={
                touched.passwordConfirmation && errors.passwordConfirmation
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword2(!showPassword2)}
                      sx={{
                        "& svg": {
                          fontSize: 20,
                          fill: (theme) => theme.palette.background.opacity3,
                        },
                      }}
                    >
                      {showPassword2 ? icons.EyeOnIcon : icons.EyeOffIcon}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack alignItems="flex-end" sx={{ mt: 1 }}>
            <Typography
              component={Link}
              to={PATH_AUTH.forgotPassword.path}
              variant="body2"
              sx={{
                color: "grey.600",
                cursor: "pointer",
                textAlign: "right",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Trở về đăng nhập?
            </Typography>
          </Stack>
          <MButton
            fullWidth
            disabled={isSubmitting}
            loading={isSubmitting}
            type="submit"
            variant="contained"
            sx={{ px: 5, mt: 2 }}
          >
            Xác nhận
          </MButton>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default ResetPassword;
