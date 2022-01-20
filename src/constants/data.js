import { icons } from "constants";
import { PATH_PAGE } from "./paths";

const sidebarHome = [
  { ...PATH_PAGE.home, icon: icons.HomeOutlineIcon },
  { ...PATH_PAGE.chat, icon: icons.ChatIcon },
  { ...PATH_PAGE.weather, icon: icons.WbSunnyIcon },
  { ...PATH_PAGE.friend, icon: icons.PeopleAltIcon },
  { ...PATH_PAGE.save, icon: icons.BookmarkBorderOutlinedIcon },
];

const sidebarFriend = [
  { title: "Danh sách bạn bè", path: "/friends", icon: icons.PeopleAltIcon },
  { title: "Gợi ý", path: "/friends/suggest", icon: icons.PeopleAltIcon },
  { title: "Lời mời", path: "/friends/invite", icon: icons.PeopleAltIcon },
  { title: "Sinh nhật", path: "/friends/birthday", icon: icons.PeopleAltIcon },
];

const menuProfile = [
  { label: "Bài viết", value: "posts" },
  { label: "Giới thiệu", value: "about" },
  { label: "Bạn bè", value: "friends" },
  { label: "Ảnh / Video", value: "photos" },
];
export default { sidebarHome, sidebarFriend, menuProfile };
