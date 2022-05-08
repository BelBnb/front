import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SexEnum } from "@/common/sex.enum";
import { User } from "@/types/redux/initStates";
import FeedbackComponent from "@/components/feedback/feedbackComponent";
import styles from "./styles.module.scss";

const ParticularUser = () => {
  const user = useSelector<RootState, User>((state) => state.user);
  /* const [hotel, setHotel] = useState<User>();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getHotelsThunk());
    console.log(params.id);
    if (params.id) {
      setHotel(hotels.find((el) => el.id === params.id));
    }
  }, [params, hotels]);*/

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContaienr}>
        <div className={styles.columns}>
          <div className={styles.rightColumn}>
            <div className={styles.avatarContainer}>
              <img src={user?.profilePic} alt="pirkol" />
            </div>
          </div>
          <div>
            <div className={styles.profileInfo}>
              <span className={styles.name}>
                {user.firstName} {user.lastName}
              </span>
              <span>{user.sex === SexEnum.Female ? "feMale" : "Male"}</span>
              <span>Sex? {user.sex === SexEnum.Female ? "Yes" : "No"}</span>

              <span className={styles.name}>
                {new Date().getFullYear() - (new Date(user?.birthDate).getFullYear() || 2001)} years
              </span>
            </div>

            <div className={styles.buttonContainer}>
              {/* if user is I am do not show*/}
              <button type="button" className={styles.outlineButton}>
                Open chat
              </button>
              {/* if user is I am do show*/}
              <button type="button" className={styles.coloredButton}>
                Edit
              </button>
            </div>
          </div>
        </div>
        <FeedbackComponent entityId={user.id} />
      </div>
    </div>
  );
};
export default ParticularUser;
