import ColoredButton from "@/elements/common/buttons/buttons";
import Searchbar from "@/elements/common/searchbar/searchbar";
import React, { useEffect, useState } from "react";
import HotelsContainer from "../hotelsContainer/hotelsContainer";
import styles from "./styles.module.scss";

const HotelsWrapper = () => {
  const [toplineClass, setTopLineClass] = useState(styles.initBorderLine);
  useEffect(() => {
    setTopLineClass(styles.endBorderLine);
  }, []);

  return (
    <div className={styles.hotelsWrapper}>
      <div className={styles.hotelsContainer}>
        <div className={`${styles.topLine} ${toplineClass}`}>
          <div className={styles.topItems}>
            <ColoredButton coloredLabel="Add hotel" onClick={() => {}} />
            <div className={styles.searchBarContainer}>
              <Searchbar />
            </div>
          </div>
          <div className={`${styles.borderLine} ${toplineClass}`} />
        </div>
        <HotelsContainer />
      </div>
    </div>
  );
};

export default HotelsWrapper;
