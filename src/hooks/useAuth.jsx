import axios from "utils/axios";
import routes from "api/apiRoutes";
import { useSelector, useDispatch } from "react-redux";
import { LOADING_AUTH, SUCCESS_AUTH, LOGOUT } from "stores/AuthSlice";
import { isValidToken, setSession, getIdByToken } from "utils/jwt";

const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const handleIsLoadingUser = (value) => dispatch(LOADING_AUTH(value));

  const handleLogout = async () => {
    await axios.get(routes.authentication().logout);
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
        dispatch(SUCCESS_AUTH(response.data.data));
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

      return { success: response.data };
    } catch (error) {
      return { error: error.response.data };
    }
  };

  const handleToggleDarkMode = async () => {
    try {
      const newSettings = {
        ...user?.settings,
        isDarkMode: !user?.settings?.isDarkMode,
      };
      const response = await axios.put(
        `${routes.users(user?._id).edit}`,
        newSettings
      );
      console.log("response", response);

      return { success: response.data };
    } catch (error) {
      return { error: error.response.data };
    }
  };

  return {
    user,
    isLoading,
    isAuth,

    setSession,
    handleAuthenticated,
    handleRegister,
    handleLogin,
    handleForgotPassword,
    handleVerifyCode,
    handleResetPassword,
    handleIsLoadingUser,
    handleLogout,
    handleToggleDarkMode,
  };
};

export default useAuth;
