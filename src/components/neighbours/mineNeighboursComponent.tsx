import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import { request, requestWithQuerry } from "@/api/apiService";
import { meNeighbourRoute, removeNeighbourRoute } from "@/api/constants";
import { Neighbours } from "@/common/types/Neighbours";
import { SexEnum } from "@/common/sex.enum";
import { PageSize } from "@/common/paginationConstants";

const MeNeighboursMain: React.FC = (): JSX.Element => {
  const user = useSelector<RootState, User>((el) => el.user);
  const [neighbours, setNeighbours] = useState<Neighbours[]>();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getStartNeighbours = async () => {
    const data = await requestWithQuerry(meNeighbourRoute, "GET", {
      limit: PageSize,
      offset: 0,
      id: user?.id,
    });
    const parsed = await data.json();
    setNeighbours(parsed.data);
    setTotal(parsed.total);
    setPage(1);
  };

  const getMoreNeighbours = async () => {
    const data = await requestWithQuerry(meNeighbourRoute, "GET", {
      limit: PageSize,
      offset: page * PageSize,
      id: user?.id,
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
    <div>
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
                <button onClick={() => remove(item.id)}>Remove</button>
              </div>
            );
          })}
          {page * PageSize < total && <button onClick={getMoreNeighbours}>Dai mne ische</button>}
        </div>
      </div>
    </div>
  );
};
export default MeNeighboursMain;
