import { ButtonProps } from "./buttons";
import styles from "./styles.module.scss";

interface OutlinedButtonProps extends ButtonProps {
  outlineLabel: string;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({ outlineLabel, onClick }) => (
  <button type="button" className={styles.outlineButton} onClick={() => onClick()}>
    {outlineLabel}
  </button>
);

export default OutlinedButton;
