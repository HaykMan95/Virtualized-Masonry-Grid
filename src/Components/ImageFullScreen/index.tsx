import { Image } from "Types";

import "./styles.scss";

interface ImageFullScreenProps {
  image: Image;
}

const ImageFullScreen = ({ image }: ImageFullScreenProps) => {
  return (
    <img
      loading="lazy"
      className="image-component"
      src={image.url}
      alt={`Image ${image.id}`}
    />
  );
};

export default ImageFullScreen;
