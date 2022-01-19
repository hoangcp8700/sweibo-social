import React from "react";
import { Outlet, useParams } from "react-router-dom";
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

const AvatarGroupStyle = styled(AvatarGroup)(() => ({
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    fontSize: 12,
    fontWeight: 700,
  },
}));

const Profile = () => {
  const params = useParams();

  const avatar =
    "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/s1080x2048/186374666_2837301546583982_8267757035377433575_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=e3f864&_nc_ohc=QtlBKR1rTwQAX8xg7fn&tn=L_BIy6fjZiNrTxJ3&_nc_ht=scontent.fsgn5-10.fna&oh=00_AT_tJT1RMPew839ArQHMuwbkdKqlIlmMRjUo6xEYxqAvuA&oe=620E5824";
  return (
    <Paper sx={{ bgcolor: "background.navbar" }}>
      <Box
        sx={{ maxWidth: (theme) => theme.breakpoints.values.md, m: "0 auto" }}
      >
        {/* profile {params?.id} */}
        {/* banner and avatar  */}
        <Box>
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

            <Divider sx={{ my: 2, mx: 3 }} />
          </Box>
        </Box>
        <Outlet />
      </Box>
    </Paper>
  );
};

export default Profile;
