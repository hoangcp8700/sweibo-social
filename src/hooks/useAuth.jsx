import axios from "utils/axios";
import routes from "api/apiRoutes";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { LOADING_AUTH, SUCCESS_AUTH, LOGOUT } from "stores/AuthSlice";
import { isValidToken, setSession, getIdByToken } from "utils/jwt";

const useAuth = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const handleIsLoadingUser = (value) => dispatch(LOADING_AUTH(value));

  const handleLogout = async () => {
    await dispatch(LOGOUT());
    await setSession(null);
  };

  const handleAuthenticated = async () => {
    dispatch(LOADING_AUTH(true));
    try {
      const accessToken = localStorage.getItem("accessToken");
      const id = accessToken && getIdByToken(accessToken);

      if (accessToken && id && isValidToken(accessToken)) {
        const response = await axios.get(routes.authentication().user);

        console.log("authen", response);
        dispatch(SUCCESS_AUTH(response.data));
        return true;
      }
      return false;
    } catch (error) {
      console.log("err auith");

      setSession(null);
      dispatch(LOADING_AUTH(false));
      return false;
    }
  };

  const handleRegister = async (form) => {
    try {
      const response = await axios.post(routes.authentication().register, form);

      enqueueSnackbar("Đăng ký thành công", { variant: "success" });
      return { success: response.data };
    } catch (error) {
      // create data
      return { error: error.response.data.errors };
    }
  };

  const handleLogin = async (form) => {
    try {
      dispatch(LOADING_AUTH);
      const response = await axios.post(routes.authentication().login, form);
      dispatch(SUCCESS_AUTH(response.data.data));
      setSession(response.data.accessToken);
      enqueueSnackbar("Đăng nhập thành công", { variant: "success" });
      return { success: response.data };
    } catch (error) {
      return { error: error.response.data };
    }
  };

  const handleForgotPassword = async (form) => {
    try {
      const response = await axios.post(
        routes.authentication().forgotPassword,
        form
      );
      enqueueSnackbar("Đã gửi mã xác nhận qua email! Vui lòng kiểm tra email", {
        variant: "success",
      });

      return { success: response.data };
    } catch (error) {
      return { error: error.response.data };
    }
  };

  const handleVerifyCode = async (form) => {
    try {
      const response = await axios.post(
        routes.authentication().verifyCode,
        form
      );
      enqueueSnackbar("Xác nhận thành công", {
        variant: "success",
      });
      return { success: response.data };
    } catch (error) {
      return { error: error.response.data };
    }
  };

  const handleResetPassword = async (form) => {
    try {
      const { token, ...restForm } = form;
      const response = await axios.post(
        `${routes.authentication().resetPassword}?token=${token}`,
        restForm
      );
      enqueueSnackbar("Đổi mật khẩu thành công", {
        variant: "success",
      });
      return { success: response.data };
    } catch (error) {
      return { error: error.response.data };
    }
  };

  return {
    user,
    isLoading,
    isAuth,
    handleAuthenticated,
    handleRegister,
    handleLogin,
    handleForgotPassword,
    handleVerifyCode,
    handleResetPassword,
    handleIsLoadingUser,
    handleLogout,
  };
};

export default useAuth;
