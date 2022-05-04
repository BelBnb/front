import React, { useEffect, useState } from "react";
import "../styles.scss";

const Carousel: React.FC = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (ind: number) => {
    let newIndex = ind;
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {React.Children.map(children, (child, index) => React.cloneElement(child, { width: "100%" }))}
      </div>
      <div className="indicators">
        {React.Children.map(children, (child, index) => (
          <button
            type="button"
            className={`${index === activeIndex ? "active" : ""}`}
            onClick={() => {
              updateIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
