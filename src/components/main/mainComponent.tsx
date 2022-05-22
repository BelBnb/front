import welcomeScreen from "@/assets/images/backgrounds/index.jpg";
import DialogComponent from "@/elements/common/dialog/dialog";
import { useState } from "react";
import styles from "./styles.module.scss";

const Main: React.FC = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.scrollBlockContainer}>
        <div className={styles.imgContainer}>
          <img src={welcomeScreen} alt="welcomeScreen" />
          <span>Welcome to BNB</span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.center}>
            <h2>About us</h2>

            <p>
              <span className={styles.header}>Welcome to BEL BNB project</span>
              <div>
                <p>
                  We are happy to meet you here, at BEL BNB project, at safe place where people can find place to stay
                  during vacation or business trip, or just find friend and satisfy the thirst for communication.
                </p>
                <p>You are absolutely welcome on our site. We hope you enjoy your time </p>
              </div>
            </p>
            <div className={styles.buttonContainer}>
              <span className={styles.authors}>Authors</span>
              <div>
                <a href="https://github.com/l1mb" target="_blank" rel="noreferrer">
                  Yan Korzun
                </a>
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
                <a href="https://github.com/Selevn" target="_blank" rel="noreferrer">
                  Selevn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
