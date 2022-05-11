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

  const [name, setName] = useState("");
  const [priceL, setPriceL] = useState(0);
  const [priceB, setPriceB] = useState(10000);

  return (
    <div className={styles.hotelsWrapper}>
      <div className={styles.hotelsContainer}>
        <div className={`${styles.topLine} ${toplineClass}`}>
          <div className={styles.topItems}>
            <ColoredButton coloredLabel="Add hotel" onClick={() => {}} />
            <div>
              <input type={"text"} value={name} placeholder={"City name"} />
              <input type={"text"} value={priceL} placeholder={"Price from"} />
              <input type={"text"} value={priceB} placeholder={"Price to"} />
            </div>
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
