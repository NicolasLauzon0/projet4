import React from 'react'

const MenuOptions = ({
    menu,
    selectedMenu,
    setSelectedMenu,
    setMenuOpen,
    store
}) => {
    return (
        menu.map((item, index) => {
            return (
                <div
                    key={index}
                    className="menu-item"
                    onClick={() => {
                        selectedMenu === item
                            ? setSelectedMenu(null)
                            : setSelectedMenu(item)
                    }}
                >
                    {item.name}
                    {selectedMenu === item &&
                        item.children.map((child, index) => (
                            <div
                                key={index}
                                className="menu-item"
                                onClick={() => {
                                    store.createNode(child.type);
                                    setMenuOpen(false);
                                }}
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

export default MenuOptions