import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import { requestWithQuerry } from "@/api/apiService";
import { allNeighboursRoute } from "@/api/constants";
import { Neighbours } from "@/common/types/Neighbours";
import { SexEnum } from "@/common/sex.enum";
import { PageSize } from "@/common/paginationConstants";
import MeNeighboursMain from "@/components/neighbours/My/mineNeighboursComponent";
import CoolLabel from "@/elements/common/coolLabel/coolLabel";
import { DateRange } from "react-date-range";
import ColoredButton from "@/elements/common/buttons/buttons";
import styles from "./styles.module.scss";
import NeighbourComponent from "../neighbourComponent/NeighbourComponent";

const NeighboursMain: React.FC = (): JSX.Element => {
  const user = useSelector<RootState, User>((el) => el.user);
  const [neighbours, setNeighbours] = useState<Neighbours[]>();
  const [total, setTotal] = useState(0);

  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(100);
  const [city, setCity] = useState("Minsk");

  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState("2030-01-01");

  const [sex, setSex] = useState(SexEnum.Whatever);

  const [page, setPage] = useState(1);

  const getStartNeighbours = async () => {
    const data = await requestWithQuerry(allNeighboursRoute, "GET", {
      limit: PageSize,
      offset: 0,
      city,
      ageMin,
      ageMax,
      startDate,
      endDate,
      sex,
    });
    const parsed = await data.json();
    setNeighbours(parsed.data);
    setTotal(parsed.total);
    setPage(1);
  };

  const getMoreNeighbours = async () => {
    const data = await requestWithQuerry(allNeighboursRoute, "GET", {
      limit: PageSize,
      offset: page * PageSize,
      city,
      ageMin,
      ageMax,
      startDate,
      endDate,
      sex,
    });
    const parsed = await data.json();
    setNeighbours((s) => [...s, ...parsed.data]);
    setPage((s) => s + 1);
  };

  useEffect(async () => {
    await getStartNeighbours();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            <MeNeighboursMain />
            {neighbours?.map((item) => (
              <div>
                <NeighbourComponent isMine={false} item={item} />
              </div>
            ))}
            {page * PageSize < total && (
              <button type="button" onClick={getMoreNeighbours}>
                Dai mne ische
              </button>
            )}
          </div>
          <div className={styles.rightCol}>
            <CoolLabel>Filters </CoolLabel>
            <DateRange ranges={[]} rangeColors={["#2d2d2d"]} onChange={(e) => e} />

            <div className={styles.buttonContainer}>
              <ColoredButton coloredLabel="Search" onClick={} />
            </div>
            <CoolLabel>Feedback</CoolLabel>
          </div>
        </div>
        <div>
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />

          <input
            type="number"
            min={18}
            max={100}
            placeholder="Age min"
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value)}
          />
          <input
            type="number"
            min={18}
            max={100}
            placeholder="Age max"
            value={ageMax}
            onChange={(e) => setAgeMax(e.target.value)}
          />
          <input
            type="date"
            min={18}
            max={100}
            placeholder="Start date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            min={18}
            max={100}
            placeholder="End date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <label>
            Sex?
            <select value={sex} onChange={(e) => setSex(e.target.value)}>
              <option selected value={SexEnum.Whatever}>
                Давай
              </option>
              <option value={SexEnum.Female}>Бабу мне</option>
              <option value={SexEnum.Male}>Мужика</option>
            </select>
          </label>

          <button onClick={getStartNeighbours}>Search</button>
        </div>
      </div>
    </div>
  );
};
export default NeighboursMain;
