import ColoredButton from "@/elements/common/buttons/buttons";
import Searchbar from "@/elements/common/searchbar/searchbar";
import queryBuilder from "@/helpers/queryBuilder";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelFilters, { hotelFiltersType } from "../HotelFilters/HotelFIlters";
import HotelsContainer from "../hotelsContainer/hotelsContainer";
import styles from "./styles.module.scss";

const HotelsWrapper = () => {
  const [filters, setFilters] = useState<hotelFiltersType>({ city: "", priceB: "", priceL: "" });
  const [toplineClass, setTopLineClass] = useState(styles.initBorderLine);
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => {
    setTopLineClass(styles.endBorderLine);
  }, []);
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();

  const navigate = useNavigate();

  const handleInput = (text: string, propName: keyof hotelFiltersType) => {
    setFilters((prev) => ({ ...prev, [propName]: text }));
  };

  // get value from query: query.get("param name here");

  const handleApply = () => {
    const q = queryBuilder(filters);
    navigate(`?${q}`);
  };

  return (
    <div className={styles.hotelsWrapper}>
      <div className={styles.hotelsContainer}>
        <div className={`${styles.topLine} ${toplineClass}`}>
          <div className={styles.topItems}>
            <div className={styles.filtersContainer}>
              <ColoredButton
                coloredLabel={filtersOpen ? "Close filters" : "Open filters"}
                onClick={() => setFiltersOpen((prevState) => !prevState)}
              />
              {filtersOpen && (
                <HotelFilters
                  setValue={handleInput}
                  city={filters.city}
                  priceL={filters.priceL}
                  priceB={filters.priceB}
                  handleApply={handleApply}
                />
              )}
            </div>
            <div className={styles.searchBarContainer}>
              <Searchbar />
              <ColoredButton coloredLabel="Add hotel" onClick={() => {}} />
            </div>
          </div>
          <div className={`${styles.borderLine} ${toplineClass}`} />
        </div>
        <HotelsContainer name="" city={filters.city} priceL={filters.priceL} priceB={filters.priceB} />
      </div>
    </div>
  );
};

export default HotelsWrapper;
