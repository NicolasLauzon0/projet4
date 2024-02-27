const MenuProject = ({
    menuProject,
    selectedMenu,
    setMenuOpen,
    setSelectedMenu,
    store,
    loadProject
}) => {

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
                                onClick={() => { child.type === "save" ? store.saveProject() : loadProject(); setMenuOpen(false); }}
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