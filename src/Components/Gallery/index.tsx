import React, { useState, useEffect } from "react";

import VirtualizedList from "Components/VirtualizedList";

import useScreenSize from "Hooks/useScreenSize";
import useWindowWidth from "Hooks/useWindowWidth";
import { Image } from "Types";

import { calculatePosition } from "./helpers";

import "./styles.scss";

const CONFIGS = {
  xs: {
    columnCount: 1,
    columnGap: 10,
    rowGap: 10,
    itemWidth: 300,
  },
  sm: {
    columnCount: 2,
    columnGap: 10,
    rowGap: 10,
    itemWidth: 250,
  },
  md: {
    columnCount: 3,
    columnGap: 10,
    rowGap: 10,
    itemWidth: 200,
  },
  lg: {
    columnCount: 4,
    columnGap: 10,
    rowGap: 10,
    itemWidth: 200,
  },
  xl: {
    columnCount: 5,
    columnGap: 10,
    rowGap: 10,
    itemWidth: 200,
  },
};

export interface GalleryImage {
  width: number;
  height: number;
  top: number;
  left: number;
  id: string;
  url: string;
}

interface GalleryProps {
  images: Image[];
}

const Gallery = ({ images }: GalleryProps) => {
  const width = useWindowWidth();
  const screenSize = useScreenSize();

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const newData = calculatePosition({
      width,
      images,
      ...CONFIGS[screenSize],
    });

    setGalleryImages(newData);
  }, [images, width, screenSize]);

  return (
    <div className="gallery-container">
      <div className="gallery-container-masonry-grid">
        <VirtualizedList containerHeight={2000} items={galleryImages} />
      </div>
    </div>
  );
};

export default Gallery;
