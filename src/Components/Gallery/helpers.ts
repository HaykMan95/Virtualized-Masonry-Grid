import { Image } from "Types";

import { GalleryImage } from "./index";

type CalculatePositionProp = {
  images: Image[];
  itemWidth: number;
  columnCount: number;
  columnGap: number;
  width: number;
  rowGap: number;
};

export const calculatePosition = ({
  images,
  itemWidth,
  columnCount,
  columnGap,
  width,
  rowGap,
}: CalculatePositionProp): GalleryImage[] => {
  const imageHeights = images.map(
    (image) => (itemWidth / image.width) * image.height,
  );

  const updatedGalleryImages: GalleryImage[] = [];
  const columnHeights = Array(columnCount).fill(0);
  const columnWidth = (width - (columnCount - 1) * columnGap) / columnCount;

  images.forEach((image, index) => {
    const columnIndex = index % columnCount;
    const imageHeight = imageHeights[index];

    const top = columnHeights[columnIndex];
    const left = columnIndex * (columnWidth + columnGap);

    columnHeights[columnIndex] += imageHeight + rowGap;

    updatedGalleryImages.push({
      ...image,
      width: itemWidth,
      height: imageHeight,
      top,
      left,
    });
  });

  return updatedGalleryImages;
};
