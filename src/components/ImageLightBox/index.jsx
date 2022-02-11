import React from "react";
import "./style.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

const LightBox = (props) => {
  const { open, onClose, images } = props;
  const [photoIndex, setPhotoIndex] = React.useState(0);

  return (
    open && (
      <Lightbox
        mainSrc={images[photoIndex]?.url}
        nextSrc={images[(photoIndex + 1) % images?.length]?.url}
        prevSrc={
          images[(photoIndex + images?.length - 1) % images?.length]?.url
        }
        onCloseRequest={onClose}
        onMovePrevRequest={() =>
          setPhotoIndex((photoIndex + images?.length - 1) % images?.length)
        }
        onMoveNextRequest={() =>
          setPhotoIndex((photoIndex + 1) % images?.length)
        }
      />
    )
  );
};

export default LightBox;
