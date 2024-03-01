import { useState } from "react";
import MenuOptions from "./MenuOptions"
import MenuProject from "./MenuProject"
import { useSaveAndLoad } from "../../../context/SaveAndLoadContext";

const Menu = ({
    menuProject,
    menu,
    store,
}) => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const {setSeeFiles} = useSaveAndLoad();
    return (
        <div className="menu">
            <div
                onClick={(e) => {
                    setMenuOpen(!menuOpen);
                    e.target.classList.add("menubutton__container--active");
                    setSeeFiles(false);
                }}
                className="menubutton"
            >
                <div className="menubutton__container"></div>
            </div>
            <div className="menu-items">
                <div className="menu-items__container">
                    {
                        menuOpen &&
                        <>
                            <MenuProject
                                menuProject={menuProject}
                                selectedMenu={selectedMenu}
                                setSelectedMenu={setSelectedMenu}
                                setMenuOpen={setMenuOpen}
                                store={store}
                            />
                            <MenuOptions
                                menu={menu}
                                selectedMenu={selectedMenu}
                                setSelectedMenu={setSelectedMenu}
                                setMenuOpen={setMenuOpen}
                                store={store}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Menu