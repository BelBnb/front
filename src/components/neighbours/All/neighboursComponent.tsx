/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import { request, requestWithQuerry } from "@/api/apiService";
import { allNeighboursRoute, removeNeighbourRoute } from "@/api/constants";
import { Neighbours } from "@/common/types/Neighbours";
import { SexEnum } from "@/common/sex.enum";
import { PageSize } from "@/common/paginationConstants";
import MeNeighboursMain from "@/components/neighbours/My/mineNeighboursComponent";
import CoolLabel from "@/elements/common/coolLabel/coolLabel";
import { DateRange, RangeKeyDict } from "react-date-range";
import ColoredButton from "@/elements/common/buttons/buttons";
import { RoleEnum } from "@/common/role.enum";
import styles from "./styles.module.scss";
import NeighbourComponent from "../neighbourComponent/NeighbourComponent";

const NeighboursMain: React.FC = (): JSX.Element => {
  const user = useSelector<RootState, User>((el) => el.user);
  const [neighbours, setNeighbours] = useState<Neighbours[]>([]);
  const [hasMy, setHasMy] = useState(true);
  const [total, setTotal] = useState(0);

  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(100);
  const [city, setCity] = useState("Minsk");

  const [selection, setSelecton] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    key: "selection",
  });
  const handleSelect = (ranges: RangeKeyDict) => {
    setSelecton(ranges?.selection);
  };

  const [sex, setSex] = useState(SexEnum.Whatever);

  const [page, setPage] = useState(1);

  const getStartNeighbours = async () => {
    const data = await requestWithQuerry(allNeighboursRoute, "GET", {
      limit: PageSize,
      offset: 0,
      city,
      ageMin,
      ageMax,
      startDate: selection.startDate.toString(),
      endDate: selection.endDate.toString(),
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
      startDate: selection.startDate.toString(),
      endDate: selection.endDate.toString(),
      sex,
    });
    const parsed = await data.json();
    setNeighbours((s) => [...s, ...parsed.data]);
    setPage((s) => s + 1);
  };

  const remove = async (id: string) => {
    await request(removeNeighbourRoute(id), "DELETE");
    setNeighbours((s) => s?.filter((item) => item.id !== id));
  };

  useEffect(async () => {
    await getStartNeighbours();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            <MeNeighboursMain setHasMyNotes={setHasMy} />
            {neighbours?.length > 0 ? (
              <div className={styles.commentsContainer}>
                <CoolLabel>All cards</CoolLabel>
                {neighbours?.map((item) => (
                  <div>
                    <NeighbourComponent
                      isMine={false}
                      item={item}
                      isDelete={user.role === RoleEnum.Admin ? { label: "Remove", onDelete: remove } : undefined}
                    />
                  </div>
                ))}
              </div>
            ) : (
              !hasMy && <span className={styles.noResults}>We didn't found anything</span>
            )}
            {page * PageSize < total && (
              <div className={styles.loadButton}>
                <ColoredButton coloredLabel="Load more" onClick={getMoreNeighbours} />
              </div>
            )}
          </div>
          <div className={styles.rightCol}>
            <CoolLabel>{"filters".toUpperCase()}</CoolLabel>
            <div className={styles.inputs}>
              <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />

              <div className={styles.colInputs}>
                <input
                  type="number"
                  min={18}
                  max={100}
                  placeholder="Min age"
                  value={ageMin}
                  onChange={(e) => setAgeMin(e.target.value)}
                />
                <input
                  type="number"
                  min={18}
                  max={100}
                  placeholder="Max age"
                  value={ageMax}
                  onChange={(e) => setAgeMax(e.target.value)}
                />
              </div>
              <div className={styles.genderContainer}>
                <span>Neighboor gender</span>
                <select value={sex} onChange={(e) => setSex(e.target.value)}>
                  <option selected value={SexEnum.Whatever}>
                    Don't care
                  </option>
                  <option value={SexEnum.Female}>Female</option>
                  <option value={SexEnum.Male}>Male</option>
                </select>
              </div>
            </div>
            <DateRange ranges={[selection]} rangeColors={["#2d2d2d"]} onChange={(e) => handleSelect(e)} />

            <div className={styles.buttonContainer}>
              <ColoredButton coloredLabel="Search" onClick={getStartNeighbours} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NeighboursMain;
