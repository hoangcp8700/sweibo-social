import React from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

import { Box, Stack, TextField, Typography, styled, Chip } from "@mui/material";
import { MButton } from "components/MUI";
import { Link, useNavigate } from "react-router-dom";
import { PATH_AUTH } from "constants/paths";
import { useAuth } from "hooks";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": { padding: theme.spacing(1.5, 3), fontSize: 14 },
}));

const initialize = {
  email: "",
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập địa chỉ email"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { handleForgotPassword } = useAuth();

  const formik = useFormik({
    initialValues: initialize,
    validationSchema: schema,
    onSubmit: async (values, { setErrors }) => {
      try {
        setIsSubmitting(true);
        const response = await handleForgotPassword(values);
        setIsSubmitting(false);

        if (response.error) {
          return setErrors({ afterSubmit: response.error });
        }

        formik.resetForm({ values: initialize });
        navigate(PATH_AUTH.verify.path, { state: values });
      } catch (error) {
        console.log("err 123", error);
      }
    },
  });

  const { errors, values, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Box sx={{ px: 5, pb: 5, pt: 3 }}>
      <Stack>
        <Box sx={{ width: "fit-content" }}>
          <Typography variant="h4" sx={{ mb: -0.5 }}>
            Quên mật khẩu
          </Typography>
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
              value={values.email}
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              placeholder="Địa chỉ email"
            />
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

export default ForgotPassword;
