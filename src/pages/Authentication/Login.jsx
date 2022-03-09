import React from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  styled,
  Divider,
  useTheme,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { MButton } from "components/MUI";
import { icons, fakeData } from "constants";
import { Link, useNavigate } from "react-router-dom";
import { PATH_AUTH, PATH_PAGE } from "constants/paths";
import { useAuth } from "hooks";
import { PopupAccountTest } from "components";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": { padding: theme.spacing(1.5, 3), fontSize: 14 },
}));

const ButtonSocial = ({ icon, title, img, ...props }) => {
  return (
    <MButton startIcon={icon} sx={{ py: 1.5 }} {...props}>
      {img ? (
        <Box sx={{ width: 24, height: 24, mr: 1 }}>
          <img src={img} alt="icon" />
        </Box>
      ) : (
        ""
      )}
      <Typography variant="subtitle2" sx={{ color: "common.black" }}>
        {title}
      </Typography>
    </MButton>
  );
};

const initialize = {
  userName: "",
  password: "",
};

const schema = Yup.object().shape({
  userName: Yup.string().required("Yêu cầu nhập nhập email hoặc số điện thoại"),
  password: Yup.string().required("Yêu cầu nhập mật khẩu"),
});

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("475"));

  const [showPassword, setShowPassword] = React.useState(false);
  const { handleLogin } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [openAccountTest, setOpenAccountTest] = React.useState(false);

  const formik = useFormik({
    initialValues: initialize,
    validationSchema: schema,
    onSubmit: async (values, { setErrors }) => {
      try {
        setIsSubmitting(true);
        alert(
          "Nếu đăng nhập lâu thì vui lòng chờ chút xíu nha mọi người! Do xài đồ miễn phí :((("
        );
        const response = await handleLogin(values);
        setIsSubmitting(false);

        if (response.error) {
          formik.resetForm({
            values: { ...values, password: "" },
          });
          return setErrors({ afterSubmit: response.error });
        }

        formik.resetForm({ values: initialize });
        navigate(PATH_PAGE.home.path);
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

  const handleLoginSocial = (name) => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/${name}`, "_self");
  };

  const handleShowAccountTest = () => setOpenAccountTest(!openAccountTest);

  const handleSubmitAccountTest = async (accountID) => {
    const getAccount = fakeData.ACCOUNT_TEST.filter(
      (item) => item?.id === accountID
    );
    if (getAccount.length) {
      await setFieldValue("userName", getAccount[0].userName);
      await setFieldValue("password", getAccount[0].password);
      await handleSubmit();
      return handleShowAccountTest();
    }
  };

  return (
    <Box sx={{ px: 5, pb: 5, pt: 3 }}>
      <PopupAccountTest
        open={openAccountTest}
        onClose={handleShowAccountTest}
        accounts={fakeData.ACCOUNT_TEST}
        onClick={handleSubmitAccountTest}
      />

      <Stack>
        <Box sx={{ width: "fit-content" }}>
          <Typography variant="h4" sx={{ mb: -0.5 }}>
            Đăng nhập
          </Typography>
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

          <Stack spacing={2} sx={{ mt: 3 }}>
            <TextFieldStyle
              autoComplete="off"
              value={values.userName}
              {...getFieldProps("userName")}
              error={Boolean(touched.userName && errors.userName)}
              helperText={touched.userName && errors.userName}
              placeholder="Địa chỉ email hoặc số điện thoại"
            />

            <TextFieldStyle
              autoComplete="current-password"
              value={values.password}
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              type={showPassword ? "string" : "password"}
              placeholder="Mật khẩu"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {values.password ? (
                      <IconButton
                        disabled={isSubmitting}
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
                    ) : (
                      ""
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            justifyContent="space-between"
            sx={{
              mt: { xs: 1, sm: 2 },
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column-reverse", sm: "row" },
              alignItems: { xs: "flex-end", sm: "center" },
            }}
          >
            <MButton
              variant="contained"
              disabled={isSubmitting}
              loading={isSubmitting}
              type="submit"
              sx={{ px: 5, width: { xs: "100%", sm: "auto" } }}
            >
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
        </Form>
      </FormikProvider>

      <Divider>
        <Typography variant="caption">Hoặc</Typography>
      </Divider>

      <Stack sx={{ justifyContent: "flex-start", mt: 1 }}>
        <ButtonSocial
          onClick={handleShowAccountTest}
          img={`${process.env.PUBLIC_URL}/weibo64.png`}
          title={`Tài khoản trải nghiệm`}
        />
        <ButtonSocial
          onClick={() => handleLoginSocial("google")}
          icon={icons.GoogleIcon}
          title={`${!matches ? "Đăng nhập với tài khoản" : ""} Google`}
        />
        <ButtonSocial
          icon={icons.FacebookIcon}
          onClick={() => handleLoginSocial("facebook")}
          title={`${!matches ? "Đăng nhập với tài khoản" : ""} Facebook`}
        />
        <ButtonSocial
          onClick={() => handleLoginSocial("github")}
          icon={icons.GitHubIcon}
          title={`${!matches ? "Đăng nhập với tài khoản" : ""} Github`}
        />
      </Stack>
    </Box>
  );
};

export default Login;
