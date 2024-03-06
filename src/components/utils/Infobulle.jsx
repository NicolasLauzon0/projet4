import { useCallback, useEffect, useRef } from "react";

const Infobulle = ({ titre, children }) => {
  const info = useRef(null);

  const handleMouseOver = useCallback((e) => {
    info.current.classList.add("iactive");
  }, []);

  const handleMouseOut = useCallback(() => {
    info.current.classList.remove("iactive");
  }, []);

  return (
    <div className="infobulle" ref={info}>
      <div
        className="boutoni"
        onMouseOver={(e) => handleMouseOver()}
        onMouseOut={() => handleMouseOut()}
      ></div>
      <div
        className="infobulle-content"
        onMouseOver={(e) => handleMouseOver()}
        onMouseOut={() => handleMouseOut()}
      >
        <h3>{titre}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default Infobulle;
