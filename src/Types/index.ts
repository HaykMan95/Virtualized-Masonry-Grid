export type ImageFromApi = {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  width: number;
  height: number;
};

export type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
};
