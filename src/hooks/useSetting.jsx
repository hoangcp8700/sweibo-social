import { useSelector, useDispatch } from "react-redux";
import {
  HANDLE_SIDEBAR_LEFT,
  HANDLE_SIDEBAR_RIGHT,
  HANDLE_DARK_MODE,
} from "stores/SettingSlice";

const useSetting = () => {
  const dispatch = useDispatch();
  // const isShowSidebarLeft = useSelector(
  //   (state) => state.setting.isShowSidebarLeft
  // );
  // const isShowSidebarRight = useSelector(
  //   (state) => state.setting.isShowSidebarRight
  // );
  const darkMode = useSelector((state) => state.setting.darkMode);

  // const handleToggleShowSidebarLeft = () => {
  //   dispatch(HANDLE_SIDEBAR_LEFT(!isShowSidebarLeft));
  // };

  // const handleToggleShowSidebarRight = (value) => {
  //   dispatch(
  //     HANDLE_SIDEBAR_RIGHT(
  //       typeof value === "boolean" ? value : !isShowSidebarRight
  //     )
  //   );
  // };

  const handleToggleDarkMode = () => {
    dispatch(HANDLE_DARK_MODE());
  };

  return {
    // isShowSidebarLeft,
    // isShowSidebarRight,
    darkMode,
    handleToggleDarkMode,
    // handleToggleShowSidebarLeft,
    // handleToggleShowSidebarRight,
  };
};

export default useSetting;
