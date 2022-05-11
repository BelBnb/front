import ColoredButton from "@/elements/common/buttons/buttons";
import Searchbar from "@/elements/common/searchbar/searchbar";
import queryBuilder from "@/helpers/queryBuilder";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelFilters, { hotelFiltersType } from "../HotelFilters/HotelFIlters";
import HotelsContainer from "../hotelsContainer/hotelsContainer";
import styles from "./styles.module.scss";
import * as debounce from "lodash.debounce";

const HotelsWrapper = () => {
  const [filters, setFilters] = useState<hotelFiltersType>({ city: "", priceB: 0, priceL: 10000 });
  const [toplineClass, setTopLineClass] = useState(styles.initBorderLine);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [findEvent, setFindEvent] = useState(false);

  const [hotelName, setHotelName] = useState("");

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
    setFindEvent((s) => !s);
  };

  const nameChanger = (val: string) => {
    setHotelName(val);
    nameChangerDebouncer();
  };

  const nameChangerDebouncer = useCallback(
    debounce(() => {
      setFindEvent((s) => !s);
    }, 300),
    []
  );

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
              <Searchbar placeholder="Enter hotel name for search" value={hotelName} valueSetter={nameChanger} />
              <ColoredButton coloredLabel="Add hotel" onClick={() => {}} />
            </div>
          </div>
          <div className={`${styles.borderLine} ${toplineClass}`} />
        </div>
        <HotelsContainer
          name={hotelName}
          city={filters.city}
          priceL={filters.priceL}
          priceB={filters.priceB}
          findEvent={findEvent}
        />
      </div>
    </div>
  );
};

export default HotelsWrapper;
