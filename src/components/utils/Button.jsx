const Button = ({ action, classe }) => {
  return (
    <div className={classe + " exit"} onClick={action}>
      <div></div>
    </div>
  );
};

export default Button;
