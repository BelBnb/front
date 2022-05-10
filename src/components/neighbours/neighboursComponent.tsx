import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import { requestWithQuerry } from "@/api/apiService";
import { allNeighboursRoute } from "@/api/constants";
import { Neighbours } from "@/common/types/Neighbours";
import { SexEnum } from "@/common/sex.enum";
import { PageSize } from "@/common/paginationConstants";
import MeNeighboursMain from "@/components/neighbours/mineNeighboursComponent";

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
    <div>
      <div>
        <MeNeighboursMain />
        <div>
          <input type={"text"} placeholder={"City"} value={city} onChange={(e) => setCity(e.target.value)} />

          <input
            type={"number"}
            min={18}
            max={100}
            placeholder={"Age min"}
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value)}
          />
          <input
            type={"number"}
            min={18}
            max={100}
            placeholder={"Age max"}
            value={ageMax}
            onChange={(e) => setAgeMax(e.target.value)}
          />
          <input
            type={"date"}
            min={18}
            max={100}
            placeholder={"Start date"}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type={"date"}
            min={18}
            max={100}
            placeholder={"End date"}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <label>
            Sex?
            <select value={sex} onChange={(e) => setSex(e.target.value)}>
              <option selected value={SexEnum.Whatever}>
                Похуй
              </option>
              <option value={SexEnum.Female}>Бабу мне</option>
              <option value={SexEnum.Male}>Мужика</option>
            </select>
          </label>

          <button onClick={getStartNeighbours}>Search</button>
        </div>
      </div>
      <div>
        <div>
          {neighbours?.map((item) => {
            return (
              <div>
                <img src={item.userImage} />
                <span>
                  {item.userFirstName} {item.userLastName}
                </span>
                <span>
                  {item.birthDate} {item.userLastName}
                </span>
                <span>{new Date().getFullYear() - new Date(item.birthDate).getFullYear()} years</span>
                <span>{item.sex === SexEnum.Female ? "F" : "M"}</span>
                <span>{item.startDate}</span>
                <span>{item.endDate}</span>
                <span>{item.description}</span>
              </div>
            );
          })}
          {page * PageSize < total && <button onClick={getMoreNeighbours}>Dai mne ische</button>}
        </div>
      </div>
    </div>
  );
};
export default NeighboursMain;
