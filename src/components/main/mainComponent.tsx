import welcomeScreen from "@/assets/images/backgrounds/index.jpg";
import DialogComponent from "@/elements/common/dialog/dialog";
import { useState } from "react";
import styles from "./styles.module.scss";

const Main: React.FC = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);

  return (
    // const handleScroll = (e) => {
    //   console.log(e);
    // };
    // const selector = useSelector<RootState, User>((el) => el.user);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //   console.log(selector);
    // }, [selector]);
    // const handleClck = () => {
    //   dispatch(
    //     setUser({
    //       email: "prikol",
    //       id: 228,
    //       roles: ["kirick"],
    //       authorized: true,
    //       firstName: "Ivan",
    //       lastName: "Skaradumau",
    //     })
    //   );
    // };
    // const handleMisClck = () => {
    //   dispatch(logUserOut());
    // };
    <div className={styles.pageWrapper}>
      <div className={styles.scrollBlockContainer}>
        <div className={styles.imgContainer}>
          <img src={welcomeScreen} alt="welcomeScreen" />
          <span>Welcome to BNB</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentContainer}>
          <div>
            <span>Main caption</span>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => {
                  setOpen(true);
                }}
                type="button"
              >
                First button
              </button>
              <DialogComponent
                cancelLabel="Back"
                setOpen={setOpen}
                submitLabel="Submit"
                title="Test title"
                cancelHandler={() => {
                  console.log("cancel");
                }}
                submitHandler={() => {
                  console.log("submit");
                }}
                isOpen={isOpen}
              >
                <input type="text" />
                <input type="text" />
                <input type="text" />
              </DialogComponent>
              <button>Second button</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
