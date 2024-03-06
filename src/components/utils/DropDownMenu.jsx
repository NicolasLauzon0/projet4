import { useEffect, useState } from "react";

const DropDownMenu = ({ options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const close = (e) => {
      if (e.target.closest(".dropdown-menu") === null) setIsOpen(false);
    };
    window.addEventListener("click", close);
    return () => {
      window.removeEventListener("click", close);
    };
  }, []);
  return (
    <div className="dropdown-menu nodrag">
      <span onClick={() => setIsOpen(!isOpen)}>
        {options[selected].split(".wav")[0].toUpperCase()}
      </span>
      {isOpen && (
        <ul>
          {Object.entries(options).map(([key, value]) => (
            <li
              key={key}
              onClick={() => {
                setSelected(key), setIsOpen(false);
              }}
            >
              <p>{value.split(".wav")[0].toUpperCase()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownMenu;
