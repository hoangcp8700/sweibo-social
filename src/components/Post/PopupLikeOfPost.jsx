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
import { LoadingEllipsisElement } from "components";
import { icons } from "constants";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "constants/paths";
import typeLike from "utils/typeLike";
import { fToNow } from "utils/formatTime";
import { usePost } from "hooks";

import { InfiniteScroll } from "providers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserItem = (props) => {
  const { item, containerStyle } = props;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
      sx={containerStyle}
    >
      <Stack direction="row" spacing={1}>
        <Avatar src={item?.createdBy?.avatar?.url} />
        <Stack>
          <Typography
            variant="subtitle2"
            component={Link}
            sx={{
              color: "text.primary",
              "&:hover": { textDecoration: "underline" },
            }}
            to={`/${PATH_PAGE.profile.link}/posts?email=${item?.createdBy?.email}`}
          >
            {item?.createdBy?.firstName} {item?.createdBy?.lastName}
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

const initialize = {
  page: 1,
  hasNextPage: true,
  data: [],
  totalLength: 0,
};

export default function PopupLikeOfPost(props) {
  const { open, postID, onClose } = props;
  const { handleGetLikes } = usePost();

  const [loading, setLoading] = React.useState(false);
  const [paginate, setPaginate] = React.useState(initialize); // likes

  const handleGetLikesCustom = React.useCallback(async () => {
    if (!paginate.hasNextPage) return;
    setLoading(true);
    const response = await handleGetLikes(paginate.page, postID);
    setPaginate({
      page: response.next,
      hasNextPage: response.hasNextPage,
      data: [...response.data, ...paginate.data],
      totalLength: response.totalLength,
    });
    setLoading(false);
  }, [paginate, postID]);

  React.useEffect(() => {
    if (!open || !postID) return;
    handleGetLikesCustom();
    return () => {
      setPaginate(initialize);
    };
  }, [open, postID]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullWidth={true}
      maxWidth="mobile"
      sx={{ zIndex: 1400 }}
    >
      <Paper sx={{ bgcolor: "background.navbar" }}>
        <Box sx={{ position: "relative" }}>
          <DialogTitle sx={{ textAlign: "center" }}>
            Những người yêu thích bài viết
          </DialogTitle>
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
            {!loading ? (
              paginate?.totalLength > 0 ? (
                <InfiniteScroll
                  hasNextPage={paginate?.hasNextPage}
                  data={paginate?.data}
                  fetch={handleGetLikes}
                  handleRefresh={() => console.log("refreshh")}
                  endMessage={`${paginate?.totalLength} người thích`}
                >
                  {paginate?.data?.map((item) => (
                    <UserItem
                      key={item._id}
                      item={item}
                      containerStyle={{ mt: 2 }}
                    />
                  ))}
                </InfiniteScroll>
              ) : (
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{ color: "text.secondary", my: 5 }}
                >
                  Hiện chưa bài viết chưa có người nào yêu thích!
                </Typography>
              )
            ) : (
              <Box
                sx={{
                  "& .lds-ellipsis": {
                    width: 30,
                    height: 30,
                    pr: 9,
                    "& div": { width: 8, height: 8, top: 15 },
                  },
                }}
              >
                <LoadingEllipsisElement />
              </Box>
            )}
          </Stack>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}
