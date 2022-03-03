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
import { MButton, MDataPicker, MRadioGroup } from "components/MUI";
import { icons } from "constants";
import { Link, useNavigate } from "react-router-dom";
import { PATH_AUTH } from "constants/paths";

import { useAuth } from "hooks";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& input": {
    padding: theme.spacing(1.5, 3),
    fontSize: 14,
    textTransform: "lowercase",
  },
}));

const genders = [
  { label: "Nam", value: "Nam" },
  { label: "Nữ", value: "Nữ" },
  { label: "Khác", value: "Khác" },
];

const initialize = {
  email: "",
  phone: "",
  password: "",
  passwordConfirmation: "",

  firstName: "",
  lastName: "",
  nickName: "",
  gender: "",
  dOB: null,
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập địa chỉ email"),
  phone: Yup.string().required("Yêu cầu nhập số điện thoại"),
  password: Yup.string()
    .required("Yêu cầu nhập mật khẩu")
    .min(6, "Mật khẩu ít nhất 6 kí tự")
    .max(50, "Mật khẩu tối đa 50 kí tự"),
  passwordConfirmation: Yup.string()
    .required("Yêu cầu nhập lại mật khẩu")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
});

const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { handleRegister } = useAuth();

  const formik = useFormik({
    initialValues: initialize,
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      try {
        setIsSubmitting(true);
        const { setErrors } = actions;
        const { passwordConfirmation, ...restForm } = values;

        const response = await handleRegister(restForm);

        setIsSubmitting(false);

        if (response.error) {
          formik.resetForm({
            values: { ...values, password: "", passwordConfirmation: "" },
          });
          setStep(0);
          return setErrors({ afterSubmit: response.error });
        }
        enqueueSnackbar("Đăng ký thành công", { variant: "success" });

        formik.resetForm({ values: initialize });
        navigate(PATH_AUTH.login.path);
      } catch (error) {
        console.log("err 123", error);
      }
    },
  });
  const {
    errors,
    values,
    touched,
    handleSubmit,

    getFieldProps,
    setFieldValue,
  } = formik;

  const disabledNextStep = React.useCallback(() => {
    return values.email &&
      values.password &&
      values.passwordConfirmation &&
      values.phone &&
      Object.keys(errors).length === 0
      ? true
      : false;
  }, [values, errors]);

  const handleNextStep = () => {
    if (
      !values.email ||
      !values.password ||
      !values.passwordConfirmation ||
      !values.phone
    )
      handleSubmit();

    return disabledNextStep() ? setStep(step !== 1 ? 1 : 0) : "";
  };
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
            Đăng ký
          </Typography>
          <Typography
            variant="body2"
            component={Link}
            to={PATH_AUTH.login.path}
            color="secondary"
            sx={{
              mt: -2,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Đã có tài khoản? Đăng nhập
          </Typography>
        </Box>
        <IconButton
          onClick={() => handleNextStep()}
          sx={{
            bgcolor: disabledNextStep() ? "primary.main" : "grey.300",
            "&:hover": {
              bgcolor: disabledNextStep() ? "primary.main" : "grey.300",
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
        <Form onSubmit={handleSubmit}>
          {/* // step 0 */}

          {errors && errors?.afterSubmit?.length ? (
            <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
              {errors?.afterSubmit.map((item, index) => (
                <Chip
                  label={item.message}
                  key={index}
                  size="small"
                  color="error"
                />
              ))}
            </Stack>
          ) : null}

          {step === 0 ? (
            <Stack spacing={2} sx={{ mt: 3 }}>
              <TextFieldStyle
                autoComplete="email"
                value={values.email}
                placeholder="Địa chỉ email"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextFieldStyle
                value={values.phone}
                autoComplete="phone"
                placeholder="Số điện thoại"
                {...getFieldProps("phone")}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />

              <TextFieldStyle
                autoComplete="current-password"
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
                autoComplete="off"
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
          ) : (
            ""
          )}

          {/* // step 1 */}
          {step === 1 ? (
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Stack direction="row" spacing={2}>
                <TextFieldStyle
                  autoComplete="off"
                  value={values.firstName}
                  placeholder="Họ và tên lót"
                  {...getFieldProps("firstName")}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextFieldStyle
                  autoComplete="off"
                  value={values.lastName}
                  placeholder="Tên"
                  {...getFieldProps("lastName")}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Stack>

              <TextFieldStyle
                autoComplete="off"
                value={values.nickName}
                placeholder="Tên khác (nếu có)"
                {...getFieldProps("nickName")}
                error={Boolean(touched.nickName && errors.nickName)}
                helperText={touched.nickName && errors.nickName}
              />

              <MDataPicker
                autoComplete="off"
                value={values?.dOB}
                onChange={(value) => setFieldValue("dOB", value)}
                label="Sinh nhật"
                inputProps={{
                  sx: {
                    "& input": { height: 10, fontSize: 14 },
                    "& svg": { fontSize: 18 },
                  },
                  placeholder: "Sinh nhật",
                }}
              />

              <MRadioGroup
                label="Giới tính: "
                lists={genders}
                radioGroupProps={{
                  ...getFieldProps("gender"),
                  sx: { "&.MuiFormGroup-root": { flexDirection: "row" } },
                }}
              />
            </Stack>
          ) : (
            ""
          )}

          <MButton
            disabled={isSubmitting}
            loading={isSubmitting}
            type="submit"
            variant="contained"
            sx={{ px: 5, mt: 2, display: step !== 1 ? "none" : "flex" }}
          >
            Đăng ký
          </MButton>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default Register;
