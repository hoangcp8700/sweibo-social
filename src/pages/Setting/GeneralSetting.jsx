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
  Divider,
} from "@mui/material";
import { MButton, MDataPicker, MRadioGroup } from "components/MUI";
import { icons } from "constants";
import { Link, useNavigate } from "react-router-dom";
import { PATH_AUTH } from "constants/paths";

import { useAuth } from "hooks";
import { LoadingEllipsis } from "components";
import { fDateOriginal } from "utils/formatTime";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": {
    fontSize: 14,
  },
}));

const Section = (props) => {
  const { label, text, children, endSection = false } = props;
  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          alignItems: "flex-start",
          gap: 2,
          px: { xs: 1.5, sm2: 3 },
          py: 2,
        }}
      >
        <Box sx={{ flex: 0.5, minWidth: 80 }}>
          <Typography variant="body2">{label}</Typography>
        </Box>
        <Box sx={{ flex: 2 }}>
          {text ? (
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              {text}
            </Typography>
          ) : (
            ""
          )}
          {children ? children : ""}
        </Box>
      </Stack>
      {!endSection ? <Divider sx={{ opacity: 0.5 }} /> : ""}
    </Box>
  );
};

const genders = [
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
  { label: "Khác", value: "" },
];

const initialize = {
  email: "",
  phone: "",

  firstName: "",
  lastName: "",
  nickName: "",
  gender: "",
  dOB: null,
};

const schema = Yup.object().shape({
  phone: Yup.string().required("Yêu cầu nhập số điện thoại"),
  firstName: Yup.string().max(20).required("Yêu cầu nhập họ và tên đệm"),
  lastName: Yup.string().max(20).required("Yêu cầu nhập tên"),
});

const GeneralSetting = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [isEdit, setIsEdit] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { handleUpdatUser, user } = useAuth();

  const formik = useFormik({
    initialValues: initialize,
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      setIsSubmitting(true);
      const response = await handleUpdatUser(user?._id, values);
      console.log("res", response);
      setIsSubmitting(false);
      enqueueSnackbar("Chỉnh sửa thông tin thành công", {
        variant: "success",
      });
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

  React.useEffect(() => {
    if (!isEdit) return;

    setFieldValue("email", user?.email);
    setFieldValue("phone", user?.phone);
    setFieldValue("firstName", user?.firstName);
    setFieldValue("lastName", user?.lastName);
    setFieldValue("nickName", user?.nickName);
    setFieldValue("dOB", user?.dOB);
    setFieldValue("gender", user?.gender);
    setErrors({});
  }, [isEdit]);

  const handleToggleEditAuth = () => setIsEdit(!isEdit);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: (theme) => theme.breakpoints.values.md,
        m: "0 auto",
      }}
    >
      {isSubmitting ? (
        <LoadingEllipsis sx={{ backgroundColor: "rgba(0,0,0,0.2)" }} />
      ) : (
        ""
      )}

      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Thông tin cá nhân
        </Typography>
        <Divider />
      </Box>

      {isEdit ? (
        <Box sx={{ heigt: "100%" }}>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <Stack spacing={3} sx={{ mt: 3 }}>
                <Stack direction="row" spacing={2}>
                  <TextFieldStyle
                    variant="standard"
                    label="Họ và tên đệm"
                    autoComplete="off"
                    value={values.firstName}
                    placeholder="Họ và tên lót"
                    {...getFieldProps("firstName")}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <TextFieldStyle
                    variant="standard"
                    label="Tên"
                    autoComplete="off"
                    value={values.lastName}
                    placeholder="Tên"
                    {...getFieldProps("lastName")}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>

                <TextFieldStyle
                  variant="standard"
                  label="Tên gọi khác"
                  autoComplete="off"
                  value={values.nickName}
                  placeholder="Tên khác (nếu có)"
                  {...getFieldProps("nickName")}
                  error={Boolean(touched.nickName && errors.nickName)}
                  helperText={touched.nickName && errors.nickName}
                />

                <Stack spacing={2}>
                  <TextFieldStyle
                    disabled
                    variant="standard"
                    label="Địa chỉ email"
                    autoComplete="email"
                    value={values.email}
                    placeholder="Địa chỉ email"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextFieldStyle
                    variant="standard"
                    label="Số điện thoại"
                    value={values.phone}
                    autoComplete="phone"
                    type="number"
                    placeholder="Số điện thoại"
                    {...getFieldProps("phone")}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Stack>

                <MDataPicker
                  autoComplete="off"
                  value={values?.dOB}
                  onChange={(value) => setFieldValue("dOB", value)}
                  label="Ngày sinh"
                  inputProps={{
                    variant: "standard",
                    label: "Ngày sinh",
                    sx: {
                      "& input": { pl: 0, fontSize: 14 },
                      "& svg": { fontSize: 18 },
                    },
                    placeholder: "Sinh nhật",
                    ...getFieldProps("dOB"),
                  }}
                />

                <MRadioGroup
                  labelStyle={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "text.secondary",
                  }}
                  label="Giới tính: "
                  lists={genders}
                  value={values.gender}
                  onChange={(e) => setFieldValue("gender", e.target.value)}
                  radioGroupProps={{
                    ...getFieldProps("gender"),
                    sx: { "&.MuiFormGroup-root": { flexDirection: "row" } },
                  }}
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ gap: 1 }}
              >
                <MButton
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  type="submit"
                  variant="contained"
                  sx={{ px: 5 }}
                >
                  Cập nhập
                </MButton>
                <MButton variant="cancel" onClick={handleToggleEditAuth}>
                  Trở về
                </MButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      ) : (
        <Box>
          <Section
            label={"Tên đầy đủ"}
            text={`${user?.firstName} ${user?.lastName}`}
          />
          <Section label={"Tên gọi khác"} text={user?.nickName || "Chưa có"} />
          <Section label={"Địa chỉ email"} text={user?.email} />
          <Section label={"Số điện thoại"} text={user?.phone} />
          <Section
            label={"Giới tính"}
            text={
              user?.gender === "male"
                ? "Nam"
                : user?.gender === "female"
                ? "Nữ"
                : "Khác"
            }
          />
          <Section
            label={"Ngày Sinh"}
            text={user?.dOB && fDateOriginal(user?.dOB)}
          />
          <Section
            label={"Tham gia ngày"}
            text={user?.createdAt && fDateOriginal(user?.createdAt)}
          />
          <Section label={"Xác minh tài khoản "}>
            <Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
              {user?.isVerify ? (
                <>
                  <IconButton
                    sx={{
                      bgcolor: (theme) => theme.palette.primary.main,
                      "&:hover": {
                        bgcolor: (theme) => theme.palette.primary.main,
                      },
                      "& svg": {
                        fontSize: 16,
                        fill: (theme) => theme.palette.common.white,
                      },
                      p: 0,
                    }}
                  >
                    {icons.DoneIcon}
                  </IconButton>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    Đã xác minh
                  </Typography>
                </>
              ) : (
                <>
                  <IconButton
                    sx={{
                      bgcolor: (theme) => theme.palette.error.main,
                      "&:hover": {
                        bgcolor: (theme) => theme.palette.error.main,
                      },
                      "& svg": {
                        fontSize: 16,
                        fill: (theme) => theme.palette.common.white,
                      },
                      p: 0,
                    }}
                  >
                    {icons.CloseIcon}
                  </IconButton>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    Chưa xác minh
                  </Typography>
                </>
              )}
            </Stack>
          </Section>

          <Stack direction="row" justifyContent="flex-end">
            <MButton
              onClick={handleToggleEditAuth}
              type="submit"
              variant="contained"
              sx={{ px: 5, mt: 2 }}
            >
              Chỉnh sửa
            </MButton>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default GeneralSetting;
