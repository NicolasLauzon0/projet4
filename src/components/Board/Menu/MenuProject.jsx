import { useSaveAndLoad } from "../../../context/SaveAndLoadContext";

const MenuProject = ({
    menuProject,
    selectedMenu,
    setMenuOpen,
    setSelectedMenu,
}) => {
    const { saveData, loadData } = useSaveAndLoad();
    return (
        menuProject.map((item, index) => {
            return (
                <div
                    key={index}
                    className="menu-item"
                    onClick={() =>
                        selectedMenu === item
                            ? setSelectedMenu(null)
                            : setSelectedMenu(item)
                    }
                >
                    {item.name}
                    {selectedMenu === item &&
                        item.children.map((child, index) => (
                            <div
                                key={index}
                                className="menu-item"
                                onClick={() => { [child.type === "save" ? saveData() : loadData(), setMenuOpen(false)] }}
                            >
                                {child.name}
                            </div>
                        ))}
                </div>
            )
        }
        )
    )
}

export default MenuProject