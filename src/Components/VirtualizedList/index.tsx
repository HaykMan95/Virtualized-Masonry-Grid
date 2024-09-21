import React, { useEffect, useState, useCallback, useMemo } from "react";

import { Link } from "react-router-dom";

import { GalleryImage } from "Components/Gallery";

import useDebounce from "Hooks/useDebounce";

import "./styles.scss";

interface VirtualizedListProps {
  items: GalleryImage[];
  containerHeight: number;
}

const GAP = 1000;

const VirtualizedList = ({ items, containerHeight }: VirtualizedListProps) => {
  const [itemsInView, setItemsInView] = useState<GalleryImage[] | null>(null);
  const lastElement = useMemo(() => items[items.length - 1], [items]);

  const doCalculation = useCallback(() => {
    const newData = items.filter((item: GalleryImage) => {
      if (
        window.scrollY - GAP <= item.top &&
        window.scrollY + containerHeight + GAP >= item.top
      ) {
        return true;
      }

      return false;
    });

    setItemsInView(newData);
  }, [items, containerHeight]);

  const loadMooreDebounce = useDebounce(doCalculation, 100);

  useEffect(() => {
    loadMooreDebounce();
  }, [loadMooreDebounce]);

  useEffect(() => {
    window.addEventListener("scroll", loadMooreDebounce);

    return () => {
      window.removeEventListener("scroll", loadMooreDebounce);
    };
  }, [loadMooreDebounce]);

  return (
    <div
      style={{
        minHeight: lastElement?.top || 0,
      }}
    >
      {itemsInView &&
        itemsInView.map(({ width, height, top, left, id, url }) => (
          <Link to={`/info/${id}`} key={id}>
            <img
              loading="lazy"
              className="gallery-container-masonry-grid-item"
              src={url}
              alt={`Image ${id}`}
              style={{
                position: "absolute",
                width,
                height,
                left,
                top,
              }}
            />
          </Link>
        ))}
    </div>
  );
};

export default VirtualizedList;
