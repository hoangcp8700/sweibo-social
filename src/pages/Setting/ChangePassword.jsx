import React from "react";
import { useNavigate } from "react-router-dom";
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
  Divider,
} from "@mui/material";
import { MButton } from "components/MUI";
import { icons, fakeData } from "constants";
import { useAuth } from "hooks";
import { PATH_PAGE } from "constants/paths";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": { padding: theme.spacing(1.5, 3), fontSize: 14 },
}));

const initialize = {
  passwordOld: "",
  password: "",
  passwordConfirmation: "",
};

const schema = Yup.object().shape({
  // passwordOld: Yup.string().required("Yêu cầu nhập mật khẩu hiện tại"),
  password: Yup.string()
    .required("Yêu cầu nhập mật khẩu")
    .min(6, "Mật khẩu ít nhất 6 kí tự")
    .max(50, "Mật khẩu tối đa 50 kí tự"),
  passwordConfirmation: Yup.string()
    .required("Yêu cầu nhập lại mật khẩu")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
});

const emails = fakeData.ACCOUNT_TEST.map((item) => item.userName);

const ChangePassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { handleChangePassword, user } = useAuth();

  const [isAccountTest, setIsAccountTest] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [showPassword3, setShowPassword3] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useState(() => {
    if (!user?._id) return;
    const checkAccount = emails.includes(user?.email);
    if (checkAccount) {
      setIsAccountTest(true);
      enqueueSnackbar("Tài khoản trải nghiệm không có quyền đổi mật khẩu", {
        variant: "warning",
      });
    }
    return () => {
      setIsAccountTest(false);
    };
  }, [user?._id]);

  const formik = useFormik({
    initialValues: initialize,
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      try {
        setIsSubmitting(true);
        const { setErrors } = actions;
        const { passwordConfirmation, ...restForm } = values;

        const response = await handleChangePassword({
          ...restForm,
        });

        setIsSubmitting(false);

        if (response.error) {
          formik.resetForm({ values: initialize });
          return setErrors({ afterSubmit: response.error });
        }
        enqueueSnackbar("Đổi mật khẩu thành công", {
          variant: "success",
        });
        formik.resetForm({ values: initialize });
      } catch (error) {
        console.log("err 123", error);
      }
    },
  });
  const { errors, values, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.md,
        m: "0 auto",
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Đổi mật khẩu
        </Typography>
        <Divider />
      </Box>

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
            <TextFieldStyle
              autoComplete="current-password"
              value={values.passwordOld}
              type={showPassword ? "string" : "password"}
              placeholder="Mật khẩu hiện tại"
              {...getFieldProps("passwordOld")}
              error={Boolean(touched.passwordOld && errors.passwordOld)}
              helperText={touched.passwordOld && errors.passwordOld}
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
              value={values.password}
              type={showPassword3 ? "string" : "password"}
              placeholder="Mật khẩu mới"
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword3(!showPassword3)}
                      sx={{
                        "& svg": {
                          fontSize: 20,
                          fill: (theme) => theme.palette.background.opacity3,
                        },
                      }}
                    >
                      {showPassword3 ? icons.EyeOnIcon : icons.EyeOffIcon}
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

          <MButton
            disabled={isSubmitting || isAccountTest}
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

export default ChangePassword;
