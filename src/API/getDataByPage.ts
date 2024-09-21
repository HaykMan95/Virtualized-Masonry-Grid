import { ImageFromApi } from "Types";

export const getDataByPage = async (pageNumber: number) => {
  const response = await fetch(
    `https://api.unsplash.com/photos?per_page=30&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_API_ACCESS_KEY}`,
      },
    },
  );

  const data = await response.json();

  const newData = data.map((image: ImageFromApi) => ({
    url: image.urls.small,
    id: image.id,
    width: image.width,
    height: image.height,
  }));

  return newData;
};
