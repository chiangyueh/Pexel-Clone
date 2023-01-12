import React, { useEffect } from "react";

const ShowPic = React.forwardRef(
  ({ src, avg_color, index, rerender, setRerender }, ref) => {
    const { original } = src;
    const handleOnload = () => {
      document.getElementsByClassName(`img${index}`)[0].style.cssText =
        "width : 100%; visibility: visible; display:block";
      if (index === 11) setRerender(true);
    };
    useEffect(() => {}, [rerender]);
    return ref ? (
      <div style={{ backgroundColor: `${avg_color}` }}>
        <img
          className={`img${index}`}
          src={original}
          alt="圖片"
          style={rerender ? { width: "100%" } : { display: "none" }}
          ref={ref}
          loading="lazy"
          onLoad={handleOnload}
        />
      </div>
    ) : (
      <div style={{ backgroundColor: `${avg_color}` }}>
        <img
          className={`img${index}`}
          src={original}
          alt="圖片"
          style={{ width: "100%" }}
          loading="lazy"
          onLoad={handleOnload}
        />
      </div>
    );
  }
);

export default ShowPic;
