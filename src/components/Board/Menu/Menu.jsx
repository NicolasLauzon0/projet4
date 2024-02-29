import { useState } from "react";
import MenuOptions from "./MenuOptions"
import MenuProject from "./MenuProject"

const Menu = ({
    menuProject,
    menu,
    store,
    loadProject,
    saveProject
}) => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="menu">
            <div
                onClick={(e) => {
                    setMenuOpen(!menuOpen);
                    e.target.classList.add("menubutton__container--active");
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
                                loadProject={loadProject}
                                saveProject={saveProject}
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