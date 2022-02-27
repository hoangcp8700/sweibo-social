import { icons } from "constants";
import { PATH_PAGE } from "./paths";
import pcVN from "pc-vn";

const sidebarHome = [
  { ...PATH_PAGE.home, icon: icons.HomeOutlineIcon },
  { ...PATH_PAGE.chat, icon: icons.ChatIcon },
  { ...PATH_PAGE.friend, icon: icons.PeopleAltIcon },
];

const sidebarFriend = [
  { title: "Danh sách bạn bè", path: "/friends", icon: icons.GroupsIcon },
  { title: "Gợi ý", path: "/friends/suggest", icon: icons.PeopleAltIcon },
  { title: "Lời mời", path: "/friends/invite", icon: icons.GroupAddIcon },
  { title: "Sinh nhật", path: "/friends/birthday", icon: icons.CakeIcon },
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

const favorites = [
  {
    label: "Ăn uống",
    value: "food",
    icon: icons.FastfoodIcon,
  },
  {
    label: "Nghe nhạc",
    value: "music",
    icon: icons.MusicNoteIcon,
  },
  {
    label: "Bóng đá",
    value: "foofball",
    icon: icons.SportsSoccerIcon,
  },
  {
    label: "Trò chơi điện tử",
    value: "game",
    icon: icons.SportsEsportsIcon,
  },
  {
    label: "Xem phim",
    value: "watch-movie",
    icon: icons.LiveTvIcon,
  },
  {
    label: "Ngủ",
    value: "sleep",
    icon: icons.LocalHotelIcon,
  },

  {
    label: "Đọc sách",
    value: "read-book",
    icon: icons.MenuBookIcon,
  },
];

const relationshipStatus = [
  { label: "Bí mật", value: "", icon: icons.LockOpenIcon },
  { label: "Độc thân", value: "Độc thân", icon: icons.EmojiPeopleIcon },
  {
    label: "Đã kết hôn",
    value: "Đã kết hôn",
    icon: icons.PeopleAltOutlinedIcon,
  },
];
const provincesOrigin = pcVN.getProvinces();
const provinces = provincesOrigin.map((item) => ({
  label: item.name,
  value: item.name,
}));

const menuFriends = [
  { label: "Tất cả bạn bè", value: "active" },
  { label: "Người theo dõi", value: "accept" },
  { label: "Đang theo dõi", value: "waiting" },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  sidebarSave,
  sidebarHome,
  sidebarFriend,
  menuProfile,
  menuFriendItem,
  favorites,
  relationshipStatus,
  provinces,
  menuFriends,
};
