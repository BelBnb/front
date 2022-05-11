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
  const [city, setCity] = useState("Minsk");
  const [priceL, setPriceL] = useState(0);
  const [priceB, setPriceB] = useState(10000);

  return (
    <div className={styles.hotelsWrapper}>
      <div className={styles.hotelsContainer}>
        <div className={`${styles.topLine} ${toplineClass}`}>
          <div className={styles.topItems}>
            <ColoredButton coloredLabel="Add hotel" onClick={() => {}} />
            <div>
              <input type={"text"} onChange={(e) => setName(e.target.value)} value={name} placeholder={"Hotel name"} />
              <input type={"city"} onChange={(e) => setCity(e.target.value)} value={city} placeholder={"City"} />
              <input
                type={"number"}
                onChange={(e) => setPriceL(e.target.value)}
                value={priceL}
                placeholder={"Price from"}
              />
              <input
                type={"number"}
                onChange={(e) => setPriceB(e.target.value)}
                value={priceB}
                placeholder={"Price to"}
              />
            </div>
            <div className={styles.searchBarContainer}>
              <Searchbar />
            </div>
          </div>
          <div className={`${styles.borderLine} ${toplineClass}`} />
        </div>
        <HotelsContainer name={name} city={city} priceL={priceL} priceB={priceB} />
      </div>
    </div>
  );
};

export default HotelsWrapper;
