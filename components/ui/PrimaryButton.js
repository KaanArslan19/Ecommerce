import classes from "./PrimaryButton.module.scss";
const PrimaryButton = ({ children, type, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        className ? [className + " " + classes.button] : classes.button
      }
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
