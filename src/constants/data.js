import { icons } from "constants";
import { PATH_PAGE } from "./paths";

const sidebarHome = [
  { ...PATH_PAGE.home, icon: icons.HomeOutlineIcon },
  { ...PATH_PAGE.chat, icon: icons.ChatIcon },
  { ...PATH_PAGE.friend, icon: icons.PeopleAltIcon },
  { ...PATH_PAGE.save, icon: icons.BookmarkBorderOutlinedIcon },
];

const sidebarFriend = [
  { title: "Danh sách bạn bè", path: "/friends", icon: icons.PeopleAltIcon },
  { title: "Gợi ý", path: "/friends/suggest", icon: icons.PeopleAltIcon },
  { title: "Lời mời", path: "/friends/invite", icon: icons.PeopleAltIcon },
  { title: "Sinh nhật", path: "/friends/birthday", icon: icons.PeopleAltIcon },
];

const sidebarSave = [
  {
    title: "Tất cả bài viết đã lưu",
    path: "/saves/all",
    icon: icons.PeopleAltIcon,
  },
];

const menuProfile = [
  { label: "Bài viết", value: "posts" },
  { label: "Bạn bè", value: "friends" },
  { label: "Ảnh / Video", value: "photos" },
];

const menuFriendItem = [
  {
    icon: icons.LikeIcon,
    iconNo: icons.UnlikeIcon,
    label: "Yêu thích",
    labelNo: "Bỏ thích",
    value: "like",
  },
  {
    icon: icons.PersonAddIcon,
    iconNo: icons.PersonRemoveIcon,
    label: "Kết bạn",
    labelNo: "Hủy kết bạn",
    value: "friend",
  },
  { icon: icons.BlockIcon, label: "Chặn", labelNo: "Bỏ chặn", value: "block" },
];
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  sidebarSave,
  sidebarHome,
  sidebarFriend,
  menuProfile,
  menuFriendItem,
};
