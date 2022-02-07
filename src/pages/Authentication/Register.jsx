import React from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
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
import { MButton, MDataPicker } from "components/MUI";
import { icons } from "constants";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "constants/paths";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": { padding: theme.spacing(1.5, 3), fontSize: 14 },
}));

const initialize = {
  email: "",
  phone: "",
  password: "",
  passwordConfirmation: "",
  firstName: "",
  lastName: "",
  userName: "",
  gender: "",
  dOB: "",
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập địa chỉ email"),
  phone: Yup.string().required("Yêu cầu nhập số điện thoại"),
  password: Yup.string()
    .required("Yêu cầu nhập mật khẩu")
    .min(8, "Mật khẩu ít nhất 8 kí tự")
    .max(50, "Mật khẩu tối đa 50 kí tự"),
  passwordConfirmation: Yup.string()
    .required("Yêu cầu nhập lại mật khẩu")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
});

const Register = () => {
  const [form, setForm] = React.useState(initialize);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [step, setStep] = React.useState(0);

  const formik = useFormik({
    initialValues: initialize,
    validationSchema: schema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      console.log("value", values);

      // formik.resetForm({ values: initialize });
    },
  });
  const {
    errors,
    values,
    resetForm,
    setErrors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
  } = formik;

  return (
    <Paper elevation={4}>
      <Box sx={{ px: 5, pb: 5, pt: 3 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h4">Đăng ký</Typography>
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
          </Box>
          <IconButton
            onClick={() => setStep(step !== 1 ? 1 : 0)}
            sx={{
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.main",
              },
              "& svg": {
                fill: (theme) => theme.palette.common.white,
                fontSize: 16,
              },
            }}
          >
            {step !== 1 ? icons.ArrowRightIcon : icons.ArrowLeftIcon}
          </IconButton>
        </Stack>

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {/* // step 0 */}
            {step === 0 ? (
              <Stack spacing={2} sx={{ mt: 3 }}>
                <TextFieldStyle
                  value={form.email}
                  placeholder="Địa chỉ email"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextFieldStyle
                  value={form.phone}
                  placeholder="Số điện thoại"
                  {...getFieldProps("phone")}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                />

                <TextFieldStyle
                  value={form.password}
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
                              fill: (theme) =>
                                theme.palette.background.opacity3,
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
                  value={form.passwordConfirmation}
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
                              fill: (theme) =>
                                theme.palette.background.opacity3,
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
            ) : (
              ""
            )}

            {/* // step 1 */}
            {step === 1 ? (
              <Stack spacing={2} sx={{ mt: 3 }}>
                <Stack direction="row" spacing={2}>
                  <TextFieldStyle
                    value={form.firstName}
                    placeholder="Họ và tên lót"
                    {...getFieldProps("firstName")}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <TextFieldStyle
                    value={form.lastName}
                    placeholder="Tên"
                    {...getFieldProps("lastName")}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>

                <MDataPicker
                  value={values?.dOB}
                  onChange={(value) => setFieldValue("dOB", value)}
                  inputProps={{
                    sx: {
                      "& input": { height: 10, fontSize: 14 },
                      "& svg": { fontSize: 18 },
                    },
                    placeholder: "Sinh nhật",
                    error: Boolean(touched.dOB && errors.dOB),
                    helperText: touched.dOB && errors.dOB,
                    ...getFieldProps("dOB"),
                  }}
                />
              </Stack>
            ) : (
              ""
            )}
            <MButton
              variant="contained"
              sx={{ px: 5, mt: 2, display: step !== 1 ? "none" : "flex" }}
              type="submit"
            >
              Đăng ký
            </MButton>
          </Form>
        </FormikProvider>
      </Box>
    </Paper>
  );
};

export default Register;
