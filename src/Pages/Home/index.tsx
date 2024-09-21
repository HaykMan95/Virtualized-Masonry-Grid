import React, { useState, useEffect, useCallback } from "react";

import Gallery from "Components/Gallery";

import { getDataByPage } from "API/getDataByPage";
import useDebounce from "Hooks/useDebounce";
import { Image } from "Types";

// import { dummyData } from "./dummyData"; // FOR PERFORMANCE TEST

const Home = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);

  const loadMoreImages = useCallback(async (pageApi: number) => {
    const newData = await getDataByPage(pageApi);
    setImages((prev) => [...prev, ...newData]);
  }, []);

  const loadMooreDebounce = useDebounce(loadMoreImages, 500);

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollHeight > window.innerHeight) {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight
        ) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    loadMooreDebounce(page);
  }, [loadMooreDebounce, page]);

  return <Gallery images={images} />;
};

export default Home;
