import DeleteTrash from "./DeleteTrash";

const Button = ({ action, classe, type = "trash" }) => {
  return (
    <>
      {type === "trash" ? (
        <DeleteTrash
          action={action}
          style={{
            position: "absolute",
            top: "2rem",
            right: "1rem",
            zIndex: "100",
          }}
        />
      ) : type === "file" ? (
        <div className={classe + " exit"} onClick={action}></div>
      ) : (
        <div className={classe} onClick={action}></div>
      )}
    </>
  );
};

export default Button;
