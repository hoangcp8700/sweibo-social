import React from "react";
import * as Yup from "yup";
import queryString from "query-string";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { useSnackbar } from "notistack";

import { Box, Stack, TextField, Typography, styled, Chip } from "@mui/material";
import { MButton } from "components/MUI";
import { PATH_AUTH } from "constants/paths";
import { useAuth } from "hooks";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": { padding: theme.spacing(1.5, 3), fontSize: 14 },
}));

const initialize = {
  code: "",
};

const schema = Yup.object().shape({
  code: Yup.string().required("Yêu cầu nhập code"),
});

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { handleVerifyCode, handleForgotPassword } = useAuth();

  const [isVerify, setIsVerify] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formik = useFormik({
    initialValues: initialize,
    validationSchema: schema,
    onSubmit: async (values, { setErrors }) => {
      try {
        setIsSubmitting(true);
        const response = await handleVerifyCode({
          ...values,
          email: email,
        });
        setIsSubmitting(false);

        console.log("VerifyCode", response);
        if (response.error) {
          return setErrors({ afterSubmit: response.error });
        }
        enqueueSnackbar("Xác nhận thành công", {
          variant: "success",
        });
        formik.resetForm({ values: initialize });
        navigate(`${PATH_AUTH.resetPassword.path}/${response.success.data}`, {
          state: { email: email },
        });
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
    setErrors,
  } = formik;

  const parsed = queryString.parse(location?.search);
  const email = parsed?.email || location?.state?.email;

  const handleSetCode = async () => {
    await setFieldValue("code", parsed?.code);
    await setErrors({});
    return handleSubmit();
  };

  React.useEffect(() => {
    if (!location?.state?.email && !parsed?.email)
      return navigate(PATH_AUTH.forgotPassword.path);
    setIsVerify(true);

    if (parsed?.code) {
      handleSetCode();
    }
    return () => setIsVerify(false);
  }, [location]);

  if (!isVerify) {
    return <div></div>;
  }

  const handleForgotPasswordCustom = async () => {
    const response = await handleForgotPassword({ email: email });
    return enqueueSnackbar(response.message, {
      variant: response.success ? "success" : "error",
    });
  };

  return (
    <Box sx={{ px: 5, pb: 5, pt: 3 }}>
      <Stack>
        <Box sx={{ width: "fit-content" }}>
          <Typography variant="h4" sx={{ mb: -0.5 }}>
            Mã hóa code
          </Typography>

          <Box>
            <Typography variant="body2" component="span">
              Chúng tôi đã gửi một mã code về email{" "}
            </Typography>
            <Typography variant="subtitle2" component="span">
              {email}.{" "}
            </Typography>
            <Typography variant="body2" component="span">
              Vui lòng kiểm tra email để xác nhận code bên dưới:
            </Typography>
          </Box>
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
              value={values.code}
              {...getFieldProps("code")}
              error={Boolean(touched.code && errors.code)}
              helperText={touched.code && errors.code}
              placeholder="Địa chỉ code"
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Typography
                onClick={handleForgotPasswordCustom}
                variant="body2"
                color="primary"
                sx={{
                  cursor: "pointer",
                  textAlign: "right",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Gửi lại mã code?
              </Typography>
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
                Quay về?
              </Typography>
            </Stack>
            <MButton
              variant="contained"
              disabled={isSubmitting}
              loading={isSubmitting}
              type="submit"
              sx={{ px: 5, width: { xs: "100%", sm: "auto" } }}
            >
              Gửi
            </MButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default VerifyCode;
