import * as React from "react";
import Slider from "react-slick";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom,
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
import { CarouselImage } from "components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const images = [
  {
    url: "https://cdn.pixabay.com/photo/2018/03/15/02/50/doll-3227004_960_720.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2018/11/09/18/24/human-rights-3805188_960_720.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2018/03/02/09/10/woman-3192674_960_720.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2018/03/15/02/50/doll-3227004_960_720.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2015/02/11/16/38/coil-632650_960_720.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2016/11/19/15/50/chair-1840011_960_720.jpg",
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
    <Dialog open={open} keepMounted onClose={onClose} fullScreen>
      <Paper sx={{ bgcolor: "background.navbar", overflow: "hidden" }}>
        <DialogContent sx={{ p: 0 }}>
          {/* btn close */}
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 1,
              }}
            >
              <IconButton
                onClick={onClose}
                sx={{
                  "& svg": {
                    fill: (theme) => theme.palette.common.white,
                    fontSize: 20,
                  },
                }}
              >
                {icons.CloseIcon}
              </IconButton>
            </Box>
          </Box>

          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: "flex-start",
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                position: { xs: "relative", md: "sticky" },
                top: 0,
                flex: 3,
                width: "100%",
                bgcolor: "common.black",
                "& .slick-slider": {
                  width: "50vw",
                  height: { xs: "50vh", md: "100vh" },
                  m: "0 auto",
                  "& .slick-list": {
                    height: "100%",
                  },
                  "& .slick-arrow": {
                    "&:before": {
                      fontSize: { xs: 30, sm: 40 },
                    },
                    "&.slick-prev": {
                      left: { xs: -50, sm: -60 },
                    },
                    "&.slick-next": {
                      right: -45,
                    },
                  },
                },
              }}
            >
              <Box>
                <Slider {...settings}>
                  {images.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        height: { xs: "50vh", md: "100vh" },
                      }}
                    >
                      <img src={item.url} alt={index} />
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>

            <Box sx={{ flex: 1, p: 2, minWidth: 300 }}>
              <Stack direction="column">
                <Typography>
                  What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum. Why do
                  we use it? It is a long established fact that a reader will be
                  distracted by the readable content of a page when looking at
                  its layout. The point of using Lorem Ipsum is that it has a
                  more-or-less normal distribution of letters, as opposed to
                  using 'Content here, content here', making it look like
                  readable English. Many desktop publishing packages and web
                  page editors now use Lorem Ipsum as their default model text,
                  and a search for 'lorem ipsum' will uncover many web sites
                  still in their infancy. Various versions have evolved over the
                  years, sometimes by accident, sometimes on purpose (injected
                  humour and the like). Where does it come from? Contrary to
                  popular belief, Lorem Ipsum is not simply random text. It has
                  roots in a piece of classical Latin literature from 45 BC,
                  making it over 2000 years old. Richard McClintock, a Latin
                  professor at Hampden-Sydney College in Virginia, looked up one
                  of the more obscure Latin words, consectetur, from a Lorem
                  Ipsum passage, and going through the cites of the word in
                  classical literature, discovered the undoubtable source. Lorem
                  Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                  Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                  written in 45 BC. This book is a treatise on the theory of
                  ethics, very popular during the Renaissance. The first line of
                  Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                  in section 1.10.32. The standard chunk of Lorem Ipsum used
                  since the 1500s is reproduced below for those interested.
                  Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
                  Malorum" by Cicero are also reproduced in their exact original
                  form, accompanied by English versions from the 1914
                  translation by H. Rackham. What is Lorem Ipsum? Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was
                  popularised in the 1960s with the release of Letraset sheets
                  containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum. Why do we use it? It is a long
                  established fact that a reader will be distracted by the
                  readable content of a page when looking at its layout. The
                  point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like). Where does it come from? Contrary to popular
                  belief, Lorem Ipsum is not simply random text. It has roots in
                  a piece of classical Latin literature from 45 BC, making it
                  over 2000 years old. Richard McClintock, a Latin professor at
                  Hampden-Sydney College in Virginia, looked up one of the more
                  obscure Latin words, consectetur, from a Lorem Ipsum passage,
                  and going through the cites of the word in classical
                  literature, discovered the undoubtable source. Lorem Ipsum
                  comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum
                  et Malorum" (The Extremes of Good and Evil) by Cicero, written
                  in 45 BC. This book is a treatise on the theory of ethics,
                  very popular during the Renaissance. The first line of Lorem
                  Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                  section 1.10.32. The standard chunk of Lorem Ipsum used since
                  the 1500s is reproduced below for those interested. Sections
                  1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                  Cicero are also reproduced in their exact original form,
                  accompanied by English versions from the 1914 translation by
                  H. Rackham. What is Lorem Ipsum? Lorem Ipsum is simply dummy
                  text of the printing and typesetting industry. Lorem Ipsum has
                  been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it
                  to make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised in the
                  1960s with the release of Letraset sheets containing Lorem
                  Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem
                  Ipsum. Why do we use it? It is a long established fact that a
                  reader will be distracted by the readable content of a page
                  when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal distribution of letters, as
                  opposed to using 'Content here, content here', making it look
                  like readable English. Many desktop publishing packages and
                  web page editors now use Lorem Ipsum as their default model
                  text, and a search for 'lorem ipsum' will uncover many web
                  sites still in their infancy. Various versions have evolved
                  over the years, sometimes by accident, sometimes on purpose
                  (injected humour and the like). Where does it come from?
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and
                  Evil) by Cicero, written in 45 BC. This book is a treatise on
                  the theory of ethics, very popular during the Renaissance. The
                  first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32. The standard chunk of
                  Lorem Ipsum used since the 1500s is reproduced below for those
                  interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                  Bonorum et Malorum" by Cicero are also reproduced in their
                  exact original form, accompanied by English versions from the
                  1914 translation by H. Rackham. What is Lorem Ipsum? Lorem
                  Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum. Why do we use it? It is a long
                  established fact that a reader will be distracted by the
                  readable content of a page when looking at its layout. The
                  point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like). Where does it come from? Contrary to popular
                  belief, Lorem Ipsum is not simply random text. It has roots in
                  a piece of classical Latin literature from 45 BC, making it
                  over 2000 years old. Richard McClintock, a Latin professor at
                  Hampden-Sydney College in Virginia, looked up one of the more
                  obscure Latin words, consectetur, from a Lorem Ipsum passage,
                  and going through the cites of the word in classical
                  literature, discovered the undoubtable source. Lorem Ipsum
                  comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum
                  et Malorum" (The Extremes of Good and Evil) by Cicero, written
                  in 45 BC. This book is a treatise on the theory of ethics,
                  very popular during the Renaissance. The first line of Lorem
                  Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                  section 1.10.32. The standard chunk of Lorem Ipsum used since
                  the 1500s is reproduced below for those interested. Sections
                  1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                  Cicero are also reproduced in their exact original form,
                  accompanied by English versions from the 1914 translation by
                  H. Rackham. What is Lorem Ipsum? Lorem Ipsum is simply dummy
                  text of the printing and typesetting industry. Lorem Ipsum has
                  been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it
                  to make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised in the
                  1960s with the release of Letraset sheets containing Lorem
                  Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem
                  Ipsum. Why do we use it? It is a long established fact that a
                  reader will be distracted by the readable content of a page
                  when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal distribution of letters, as
                  opposed to using 'Content here, content here', making it look
                  like readable English. Many desktop publishing packages and
                  web page editors now use Lorem Ipsum as their default model
                  text, and a search for 'lorem ipsum' will uncover many web
                  sites still in their infancy. Various versions have evolved
                  over the years, sometimes by accident, sometimes on purpose
                  (injected humour and the like). Where does it come from?
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and
                  Evil) by Cicero, written in 45 BC. This book is a treatise on
                  the theory of ethics, very popular during the Renaissance. The
                  first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32. The standard chunk of
                  Lorem Ipsum used since the 1500s is reproduced below for those
                  interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                  Bonorum et Malorum" by Cicero are also reproduced in their
                  exact original form, accompanied by English versions from the
                  1914 translation by H. Rackham.
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}
