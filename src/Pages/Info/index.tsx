import { useEffect, useState, useCallback } from "react";

import { useParams, useNavigate } from "react-router-dom";

import ImageFullScreen from "Components/ImageFullScreen";

import { getDataById } from "API/getDataById";
import { Image } from "Types";

function Info() {
  const navigate = useNavigate();
  const { imageId } = useParams();
  const [image, setImage] = useState<Image | null>(null);

  const loadImage = useCallback(async (id: string) => {
    const newData = await getDataById(id);
    setImage(newData);
  }, []);

  useEffect(() => {
    if (imageId) {
      loadImage(imageId);
    }
  }, [loadImage, imageId]);

  return (
    <>
      <button onClick={() => navigate(-1)}>BACK</button>
      {image && <ImageFullScreen image={image} />}
    </>
  );
}

export default Info;
