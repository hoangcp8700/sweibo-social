import React from "react";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Stack,
  AvatarGroup,
  Avatar,
  Typography,
  Divider,
  styled,
} from "@mui/material";
import { icons } from "constants";
import { MButton } from "components/MUI";
import { data } from "constants";
import { PATH_PAGE } from "constants/paths";

const AvatarGroupStyle = styled(AvatarGroup)(() => ({
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    fontSize: 12,
    fontWeight: 700,
  },
}));
const avatar =
  "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/s1080x2048/186374666_2837301546583982_8267757035377433575_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=e3f864&_nc_ohc=QtlBKR1rTwQAX8xg7fn&tn=L_BIy6fjZiNrTxJ3&_nc_ht=scontent.fsgn5-10.fna&oh=00_AT_tJT1RMPew839ArQHMuwbkdKqlIlmMRjUo6xEYxqAvuA&oe=620E5824";

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const handleRedirect = (key) => {
    navigate(
      `/${PATH_PAGE.friend.link}/${PATH_PAGE.profile.link}/${params?.id}/${key}`
    );
  };
  return (
    <Box>
      <Box
        sx={{ maxWidth: (theme) => theme.breakpoints.values.lg, m: "0 auto" }}
      >
        {/* banner and avatar  */}
        <Paper sx={{ bgcolor: "background.navbar" }}>
          <Box>
            <Paper
              sx={[
                { overflow: "hidden" },
                (theme) => ({
                  borderRadius: 0,
                  borderBottomLeftRadius: theme.sizes.base,
                  borderBottomRightRadius: theme.sizes.base,
                }),
              ]}
            >
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 200, mobile: 300, sm: 400 },
                }}
              >
                <img
                  src={avatar}
                  alt="banner"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Paper>

            <Stack
              sx={[
                {
                  mt: -5,
                  px: 3,
                  alignItems: { xs: "center", sm: "flex-start" },
                },
                (theme) => ({ [theme.breakpoints.down("375")]: { px: 1 } }),
              ]}
            >
              <Stack
                sx={{
                  width: "100%",
                  gap: 2,
                  // flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  alignItems: { xs: "center", sm: "flex-end" },
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Avatar
                  sx={avatar}
                  alt="avatar"
                  sx={{
                    width: { xs: 120, sm: 168 },
                    height: { xs: 120, sm: 168 },
                    border: (theme) =>
                      `3px solid ${theme.palette.background.paper}`,
                    boxShadow: (theme) => theme.shadows[5],
                  }}
                />
                <Stack
                  sx={{
                    flexGrow: 1,
                    mb: { xs: 0, sm: 2 },
                    alignItems: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h3">
                      Xuan Hoang {params?.id}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 400 }}>
                      (Đạm){" "}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography>3.8k bạn bè</Typography>
                    <Typography sx={{ fontWeight: 700 }}>•</Typography>
                    <Typography>131 bạn chung</Typography>
                  </Stack>

                  <Stack
                    alignItems="center"
                    sx={{
                      flexWrap: "wrap",
                      gap: { xs: 2, sm: 1 },
                      width: "100%",
                      justifyContent: { xs: "center", sm: "space-between" },
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <AvatarGroupStyle max={6}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Avatar
                        alt="Cindy Baker"
                        src="/static/images/avatar/3.jpg"
                      />
                      <Avatar
                        alt="Agnes Walker"
                        src="/static/images/avatar/4.jpg"
                      />
                      <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                      />
                    </AvatarGroupStyle>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MButton
                        startIcon={icons.PersonIcon}
                        variant="contained"
                        sx={{
                          bgcolor: "background.opacity1",
                          color: "text.primary",
                          "&:hover": {
                            bgcolor: "background.opacity2",
                          },
                        }}
                      >
                        Bạn bè
                      </MButton>
                      <MButton
                        startIcon={icons.MessageIcon}
                        variant="contained"
                      >
                        Nhắn tin
                      </MButton>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Divider sx={{ mt: 2, mx: 3 }} />

            <Box sx={{ px: 3, mt: 0.5 }}>
              <Stack direction="row" spacing={1}>
                {data?.menuProfile?.map((item, index) => {
                  const getIndex = location.pathname.indexOf(params?.id);
                  const newString = location.pathname.slice(getIndex);
                  const match = newString.includes(item.value);
                  return (
                    <MButton
                      key={item.label}
                      sx={{
                        py: 1,
                        px: 2,
                        position: "relative",
                        color: match ? "primary.main" : "text.primary",

                        "&:hover": {
                          bgcolor: "background.opacity",
                        },
                      }}
                      onClick={() => handleRedirect(item.value)}
                    >
                      {item.label}
                      <Box
                        className="borderBottom"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          borderBottom: (theme) =>
                            `3px solid ${theme.palette.primary.main}`,
                          bgcolor: "primary.main",
                          width: match ? "100%" : "0%",
                          height: 3,
                          transition: "width .3s",
                        }}
                      />
                    </MButton>
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ bgcolor: "background.main" }}>
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
};

export default Profile;
