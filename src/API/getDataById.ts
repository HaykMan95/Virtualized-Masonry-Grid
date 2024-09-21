import { Image, ImageFromApi } from "../Types";

export const getDataById = async (imageId: string): Promise<Image> => {
  const response = await fetch(`https://api.unsplash.com/photos/${imageId}`, {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_API_ACCESS_KEY}`,
    },
  });
  // throw new Error("I crashed!");

  const data = (await response.json()) as ImageFromApi;

  return {
    url: data.urls.full,
    id: data.id,
    width: data.width,
    height: data.height,
  };
};
