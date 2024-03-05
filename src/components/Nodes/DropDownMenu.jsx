import { useState } from "react";

const DropDownMenu = ({ options, selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="dropdown-menu nodrag">
            <span
                onClick={() => setIsOpen(!isOpen)}>
                {options[selected].split(".wav")[0].toUpperCase()}
            </span>
            {
                isOpen &&
                <ul>
                    {Object.entries(options).map(([key, value]) => (
                        <li key={key} onClick={
                            () => {
                                setSelected(key),
                                setIsOpen(false)
                            }}>
                            <p>
                                {value.split(".wav")[0].toUpperCase()}
                            </p>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default DropDownMenu