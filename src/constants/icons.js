import { SvgIcon, Icon } from "@mui/material";

// ---------------------------------------
import messageSVG from "assets/icons/message.svg";

// ------------------------------------------------
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/RemoveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteIcon from "@mui/icons-material/Clear";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import CakeIcon from "@mui/icons-material/Cake";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import BlockIcon from "@mui/icons-material/Block";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import InfoIcon from "@mui/icons-material/Info";
import SendIcon from "@mui/icons-material/Send";
import PhotoIcon from "@mui/icons-material/Photo";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";

import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import PublicIcon from "@mui/icons-material/Public";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import GroupsIcon from "@mui/icons-material/Groups";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const ConvertIcon = ({ src }) => {
  return (
    <Icon>
      <img src={src} />
    </Icon>
  );
};

export default {
  HomeOutlineIcon: <HomeOutlinedIcon />,
  RemoveIcon: <RemoveIcon />,
  ArrowRightIcon: <ArrowForwardIosIcon />,
  ArrowLeftIcon: <ArrowBackIosNewIcon />,
  AddIcon: <AddIcon />,
  SettingIcon: <SettingsOutlinedIcon />,
  SearchIcon: <SearchOutlinedIcon />,
  NotificationIcon: <NotificationsNoneOutlinedIcon />,
  ChatIcon: <ChatIcon />,
  EditIcon: <EditIcon />,
  DeleteIcon: <DeleteIcon />,

  ArrowDropDownIcon: <ArrowDropDownIcon />,
  ArrowDropUpIcon: <ArrowDropUpIcon />,
  Brightness4Icon: <Brightness4Icon />,
  LogoutIcon: <LogoutIcon />,
  MoreHorizIcon: <MoreHorizIcon />,

  LikeIcon: <ThumbUpIcon />,
  NoLikeIcon: <ThumbUpOutlinedIcon />,

  UnlikeIcon: <ThumbDownAltIcon />,
  CommentIcon: <ChatBubbleOutlineOutlinedIcon />,
  ShareIcon: <ShareOutlinedIcon />,
  HeartIcon: <FavoriteOutlinedIcon />,
  CakeIcon: <CakeIcon />,
  PeopleAltIcon: <PeopleAltIcon />,

  WbSunnyIcon: <WbSunnyIcon />,
  BookmarkBorderOutlinedIcon: <BookmarkBorderOutlinedIcon />,
  PersonAddIcon: <PersonAddIcon />,
  PersonIcon: <PersonIcon />,
  PersonRemoveIcon: <PersonRemoveIcon />,
  MessageIcon: <ConvertIcon src={messageSVG} />,
  BlockIcon: <BlockIcon />,

  EmojiEmotionsIcon: <EmojiEmotionsIcon />,
  CheckCircleOutlineIcon: <CheckCircleOutlineIcon />,
  CheckCircleIcon: <CheckCircleIcon />,

  ExpandLessIcon: <ExpandLessIcon />,
  ExpandMoreIcon: <ExpandMoreIcon />,

  InfoIcon: <InfoIcon />,
  SendIcon: <SendIcon />,
  PhotoIcon: <PhotoIcon />,
  MoreVertIcon: <MoreVertIcon />,
  PinIcon: <PushPinIcon />,

  BookmarkRemoveIcon: <BookmarkRemoveIcon />,
  PublicIcon: <PublicIcon />,
  LockOpenIcon: <LockOpenIcon />,

  GroupsIcon: <GroupsIcon />,
  GroupAddIcon: <GroupAddIcon />,

  EyeOnIcon: <RemoveRedEyeOutlinedIcon />,
  EyeOffIcon: <VisibilityOffOutlinedIcon />,

  GoogleIcon: <GoogleIcon sx={{ "& path": { fill: "#DB4437" } }} />,
  GitHubIcon: <GitHubIcon sx={{ "& path": { fill: "#000" } }} />,
  FacebookIcon: <FacebookIcon sx={{ "& path": { fill: "#4267B2" } }} />,

  CameraIcon: <PhotoCameraOutlinedIcon />,
  CloseIcon: <CloseIcon />,
  ReplayIcon: <ReplayIcon />,
  AddPhotoIcon: <AddPhotoAlternateOutlinedIcon />,
  DeleteForeverIcon: <DeleteForeverOutlinedIcon />,
};
