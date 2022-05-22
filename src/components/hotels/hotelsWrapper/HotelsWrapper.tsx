import ColoredButton from "@/elements/common/buttons/buttons";
import Searchbar from "@/elements/common/searchbar/searchbar";
import queryBuilder from "@/helpers/queryBuilder";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as debounce from "lodash.debounce";
import useOutsideAlerter from "@/hooks/useOutside/useOutsideAlerter";
import HotelFilters, { hotelFiltersType } from "../HotelFilters/HotelFIlters";
import HotelsContainer from "../hotelsContainer/hotelsContainer";
import styles from "./styles.module.scss";

const HotelsWrapper = () => {
  const [filters, setFilters] = useState<hotelFiltersType>({ city: "", priceB: 0, priceL: 10000 });
  const [toplineClass, setTopLineClass] = useState(styles.initBorderLine);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [findEvent, setFindEvent] = useState(false);

  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);
  useOutsideAlerter(ref, () => {
    setFiltersOpen(false);
  });

  const [invokeAddHotel, setInvokeAddHotel] = useState(0);

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

  const nameChangerDebouncer = useCallback(
    debounce(() => {
      setFindEvent((s) => !s);
    }, 300),
    []
  );

  const nameChanger = (val: string) => {
    setHotelName(val);
    nameChangerDebouncer();
  };

  return (
    <div className={styles.hotelsWrapper}>
      <div className={styles.hotelsContainer}>
        <div className={`${styles.topLine} ${toplineClass}`}>
          <div className={styles.topItems}>
            <div className={styles.filtersContainer}>
              <ColoredButton
                coloredLabel={filtersOpen ? "Close filters" : "Open filters"}
                onClick={() => {
                  setFiltersOpen((prevState) => !prevState);
                }}
              />
              {filtersOpen && (
                <HotelFilters
                  setValue={handleInput}
                  city={filters.city}
                  priceL={filters.priceL}
                  priceB={filters.priceB}
                  handleApply={handleApply}
                  ref={ref}
                />
              )}
            </div>
            <div className={styles.searchBarContainer}>
              <Searchbar placeholder="Enter hotel name for search" value={hotelName} valueSetter={nameChanger} />
              <ColoredButton coloredLabel="Add hotel" onClick={() => setInvokeAddHotel((s) => s + 1)} />
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
          invokeAddHotel={invokeAddHotel}
        />
      </div>
    </div>
  );
};

export default HotelsWrapper;
