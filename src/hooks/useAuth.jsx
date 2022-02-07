import axios from "utils/axios";
import routes from "api/apiRoutes";
import { useSnackbar } from "notistack";

const useAuth = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async (form) => {
    try {
      const response = await axios.post(routes.authentication().register, form);
      enqueueSnackbar("Đăng ký thành công", { variant: "success" });

      console.log("res", response);
    } catch (error) {
      console.log("err", error);
    }
  };

  return { handleRegister };
};

export default useAuth;
