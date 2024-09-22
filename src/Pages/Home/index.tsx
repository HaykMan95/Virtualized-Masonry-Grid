import React, { useEffect, useCallback, useContext } from "react";

import Gallery from "Components/Gallery";

import { getDataByPage } from "API/getDataByPage";
import useDebounce from "Hooks/useDebounce";

import { AppContext } from "../../App";

// import { dummyData } from "./dummyData"; // FOR PERFORMANCE TEST

const Home = () => {
  const { setPage, setImages, images, page } = useContext(AppContext);

  const loadMoreImages = useCallback(
    async (pageApi: number) => {
      const newData = await getDataByPage(pageApi);
      setImages?.((prev) => [...prev, ...newData]);
    },
    [setImages],
  );

  const loadMooreDebounce = useDebounce(loadMoreImages, 500);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.documentElement.scrollHeight > window.innerHeight &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight
      ) {
        setPage?.((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setPage]);

  useEffect(() => {
    loadMooreDebounce(page);
  }, [loadMooreDebounce, page]);

  return <Gallery images={images} />;
};

export default Home;
