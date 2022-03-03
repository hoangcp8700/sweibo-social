import React from "react";
import {
  Stack,
  Box,
  Avatar,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { icons } from "constants";
import { MButton, MMenu } from "components/MUI";
import { data } from "constants";
import checkCreatedByFriend from "utils/checkCreatedByFriend";
import { PATH_PAGE } from "constants/paths";

const ActionFriend = (props) => {
  const { leftIcon, rightIcon, titleLeft, titleRight, onAccept, onCancel } =
    props;
  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
      <MButton
        startIcon={leftIcon}
        variant="contained"
        color="primary"
        sx={{
          py: 0.5,
          "& .MuiButton-startIcon": { mr: { xs: 0, mobile: 1 } },
        }}
        onClick={onAccept}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: { xs: 12, mobile: 14 },
            display: { xs: "none", mobile: "block" },
          }}
        >
          {titleLeft}
        </Typography>
      </MButton>
      <MButton
        startIcon={rightIcon}
        variant="cancel"
        sx={{ py: 0.5, "& .MuiButton-startIcon": { mr: { xs: 0, mobile: 1 } } }}
        onClick={onCancel}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: { xs: 12, mobile: 14 },
            display: { xs: "none", mobile: "block" },
          }}
        >
          {titleRight}
        </Typography>
      </MButton>
    </Stack>
  );
};
const FriendItem = (props) => {
  const { item, user, handleUpdateStatusFriend, handleDeleteFriend } = props;
  const nameFriend = checkCreatedByFriend(user, item?.createdBy);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            component={Link}
            to={`/${PATH_PAGE.profile.link}/posts?email=${
              nameFriend && item[nameFriend]?.email
            }`}
          >
            <Avatar
              src={(nameFriend && item[nameFriend]?.avatar?.url) || false}
              sx={{
                borderRadius: (theme) => theme.sizes.minBase,
                width: { xs: 60, md: 80 },
                height: { xs: 60, md: 80 },
              }}
            />
          </Typography>

          <Stack spacing={1}>
            <Typography
              variant="subtitle2"
              component={Link}
              to={`/${PATH_PAGE.profile.link}/posts?email=${
                nameFriend && item[nameFriend]?.email
              }`}
              sx={{ color: "text.primary" }}
            >
              {nameFriend &&
                `${item[nameFriend]?.firstName} ${item[nameFriend]?.lastName}`}
            </Typography>

            {/* // type */}

            {item?.status === "Active" ? (
              <ActionFriend
                leftIcon={icons.DoneIcon}
                rightIcon={icons.CloseIcon}
                titleLeft="Bạn bè"
                titleRight="Hủy kết bạn"
                onAccept={() => {}}
                onCancel={() =>
                  handleDeleteFriend(
                    item?._id,
                    false,
                    "Bạn đã chắc chắn muốn hủy kết bạn người này chưa?"
                  )
                }
              />
            ) : nameFriend === "targetID" ? (
              <ActionFriend
                leftIcon={icons.DoneIcon}
                rightIcon={icons.CloseIcon}
                titleLeft="Chờ chấp nhận"
                titleRight="Gỡ"
                onAccept={() => {}}
                onCancel={() =>
                  handleDeleteFriend(
                    item?._id,
                    false,
                    "Bạn đã chắc chắn muốn hủy yêu cầu kết bạn người này?"
                  )
                }
              />
            ) : (
              <ActionFriend
                leftIcon={icons.DoneIcon}
                rightIcon={icons.CloseIcon}
                titleLeft="Chấp nhận"
                titleRight="Gỡ"
                onAccept={() => handleUpdateStatusFriend(item?._id)}
                onCancel={() =>
                  handleDeleteFriend(
                    item?._id,
                    false,
                    "Bạn đã chắc chắn muốn gỡ yêu cầu kết bạn từ người này?"
                  )
                }
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default FriendItem;
