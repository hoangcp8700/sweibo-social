import { icons } from "constants";
import { PATH_PAGE } from "./paths";

const sidebarHome = [
  { ...PATH_PAGE.home, icon: icons.HomeOutlineIcon },
  { ...PATH_PAGE.chat, icon: icons.ChatIcon },
  { ...PATH_PAGE.weather, icon: icons.WbSunnyIcon },
  { ...PATH_PAGE.friend, icon: icons.PeopleAltIcon },
  { ...PATH_PAGE.save, icon: icons.BookmarkBorderOutlinedIcon },
];

export default { sidebarHome };
