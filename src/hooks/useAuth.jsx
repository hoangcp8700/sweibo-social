import axios from "utils/axios";
import routes from "api/apiRoutes";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { LOADING_AUTH, SUCCESS_AUTH, LOG_OUT } from "stores/AuthSlice";

const useAuth = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isAuth = useSelector((state) => state.auth.isAuth);

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
      console.log("ré", response);
      enqueueSnackbar("Đã gửi mã xác nhận qua email bạn vừa nhập", {
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
    handleRegister,
    handleLogin,
    handleForgotPassword,
  };
};

export default useAuth;
