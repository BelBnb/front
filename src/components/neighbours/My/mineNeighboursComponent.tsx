import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import { request, requestWithQuerry } from "@/api/apiService";
import { meNeighbourRoute, removeNeighbourRoute } from "@/api/constants";
import { Neighbours } from "@/common/types/Neighbours";
import { PageSize } from "@/common/paginationConstants";
import CoolLabel from "@/elements/common/coolLabel/coolLabel";
import ColoredButton from "@/elements/common/buttons/buttons";
import NeighbourComponent from "../neighbourComponent/NeighbourComponent";
import styles from "./styles.module.scss";

interface MeNeighboursMainProps {
  setHasMyNotes: (e: boolean) => void;
}

const MeNeighboursMain: React.FC<MeNeighboursMainProps> = ({ setHasMyNotes }): JSX.Element => {
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
    setHasMyNotes(parsed && !(parsed.statusCode || parsed.status) && parsed.data.length > 0);
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
          <div>{neighbours?.length > 0 && <CoolLabel>Your cards</CoolLabel>}</div>
          <div className={styles.commentsContainer}>
            {neighbours?.map((item) => (
              <div>
                <NeighbourComponent item={item} isMine isDelete={{ label: "Remove", onDelete: remove }} />
              </div>
            ))}
          </div>
          {page * PageSize < total && (
            <div className={styles.loadButton}>
              <ColoredButton coloredLabel="Load more" onClick={getMoreNeighbours} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MeNeighboursMain;
