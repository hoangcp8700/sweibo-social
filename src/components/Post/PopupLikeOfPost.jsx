import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Paper,
  Box,
  Divider,
  IconButton,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import { icons } from "constants";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "constants/paths";
import typeLike from "utils/typeLike";
import { fToNow } from "utils/formatTime";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserItem = (props) => {
  const { item } = props;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
    >
      <Stack direction="row" spacing={1}>
        <Avatar />
        <Stack>
          <Typography
            variant="subtitle2"
            component={Link}
            sx={{
              color: "text.primary",
              "&:hover": { textDecoration: "underline" },
            }}
            to={`/${PATH_PAGE.profile.link}/posts?email=${item?.user?.email}`}
          >
            {item?.user?.firstName} {item?.user?.lastName}
          </Typography>
          <Typography variant="caption" sx={{ cursor: "context-menu" }}>
            {item?.createdAt && fToNow(item?.createdAt)}
          </Typography>
        </Stack>
      </Stack>
      {/* {item?.type && typeLike(item?.type)} */}
    </Stack>
  );
};

const users = [
  {
    user: {
      firstName: "abc",
      lastName: "aaa",
      email: "hoangcp219@gmail.com",
      _id: 1,
    },
    createdAt: new Date(),
    type: "Like",
  },
  {
    user: {
      firstName: "abc",
      lastName: "aaa",
      email: "hoangcp219@gmail.com",
      _id: 21,
    },
    createdAt: new Date(),
    type: "Like",
  },
  {
    user: {
      firstName: "abc",
      lastName: "aaa",
      email: "hoangcp219@gmail.com",
      _id: 31,
    },
    createdAt: new Date(),
    type: "Like",
  },
];
export default function PopupLikeOfPost(props) {
  const { open, postID, onClose } = props;

  React.useEffect(() => {
    if (!open || postID) return;
    const getUserLike = () => {
      try {
        // const response  = await
      } catch (error) {
        console.log("err", error);
      }
    };
    getUserLike();
  }, [open, postID]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullWidth={true}
      maxWidth="mobile"
    >
      <Paper sx={{ bgcolor: "background.navbar" }}>
        <Box sx={{ position: "relative" }}>
          <DialogTitle sx={{ textAlign: "center" }}>Tất cả</DialogTitle>
          <Divider />
          {/* btn close */}
          <Paper
            elevation={5}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "background.opacity2",
              borderRadius: "50%",
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                "& svg": {
                  fill: (theme) => theme.palette.text.primary,
                  fontSize: 14,
                },
              }}
            >
              {icons.CloseIcon}
            </IconButton>
          </Paper>
        </Box>
        <DialogContent>
          <Stack spacing={2}>
            {users?.length
              ? users.map((item) => <UserItem key={item._id} item={item} />)
              : ""}
          </Stack>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}
