import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

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

const SlideImage = (props) => {
  const { images } = props;
  return (
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
          {images && images?.length
            ? images.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    height: { xs: "50vh", md: "100vh" },
                  }}
                >
                  <img src={item.url || item.secure_url} alt={index} />
                </Box>
              ))
            : ""}
        </Slider>
      </Box>
    </Box>
  );
};

export default SlideImage;
