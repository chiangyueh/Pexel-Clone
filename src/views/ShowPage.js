import React, { useCallback, useRef, useState, useEffect } from "react";
import usePexels from "../hooks/usePexels";
import styles from "./ShowPage.module.css";
import ShowPic from "../components/ShowPic";
import Loading from "../components/Loading";
import useWidth from "../hooks/useWidth";
const colFilter = (item, index, colNum, result, observeTag, totalCol,rerender,setRerender) => {
  if (index % totalCol !== colNum) return;
  const { src, avg_color } = item;
  if (index !== result.length - 1)
    return (
      <ShowPic src={src} avg_color={avg_color} key={index} index={index} rerender={rerender} setRerender={setRerender}/>
    );
  return (
    <ShowPic
      ref={observeTag}
      src={src}
      avg_color={avg_color}
      key={index}
      index={index}
      rerender={rerender}
      setRerender={setRerender}
    />
  );
};

const ShowPage = ({ getPexelPics}) => {
  const [pageNum, setPageNum] = useState(1);
  const { loading, result, errMessage, error, nextPage } = usePexels(
    pageNum,
    getPexelPics
  );
  const [rerender,setRerender] = useState(false)
  let observer = useRef();
  let observeTag = useCallback(
    (tag) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((e) => {
        if (e[0].isIntersecting && nextPage) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (tag) observer.current.observe(tag);
    },
    [loading, nextPage]
  );

  const threeCol_firstCol = result.map((item, index) =>
    colFilter(item, index, 0, result, observeTag, 3 ,rerender,setRerender)
  );
  const threeCol_secondCol = result.map((item, index) =>
    colFilter(item, index, 1, result, observeTag, 3,rerender, setRerender)
  );
  const threeCol_thirdCol = result.map((item, index) =>
    colFilter(item, index, 2, result, observeTag, 3,rerender, setRerender)
  );
  const twoCol_firstCol = result.map((item, index) =>
    colFilter(item, index, 0, result, observeTag, 2,rerender, setRerender)
  );
  const twoCol_secondCol = result.map((item, index) =>
    colFilter(item, index, 1, result, observeTag, 2,rerender, setRerender)
  );
  if(error) console.log(errMessage.msg)
  return (
    <div className={styles.wrapper} >
      <div className={styles.container} id='container'>
        {useWidth() > 900 ? (
          <>
            <div className={styles.items}>{threeCol_firstCol}</div>
            <div className={styles.items}>{threeCol_secondCol}</div>
            <div className={styles.items}>{threeCol_thirdCol}</div>
          </>
        ) : (
          <>
            <div className={styles.items}>{twoCol_firstCol}</div>
            <div className={styles.items}>{twoCol_secondCol}</div>
          </>
        )}
      </div>
      {loading ? <Loading /> : ""}
    </div>
  );
};

export default ShowPage;
