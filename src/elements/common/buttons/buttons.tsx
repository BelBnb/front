import styles from "./styles.module.scss";

export interface ButtonProps {
  onClick: () => void;
}
interface ColoredButtonProps extends ButtonProps {
  coloredLabel: string;
}

const ColoredButton: React.FC<ColoredButtonProps> = ({ coloredLabel, onClick }) => (
  <button type="button" className={styles.coloredButton} onClick={() => onClick()}>
    {coloredLabel}
  </button>
);

export default ColoredButton;
