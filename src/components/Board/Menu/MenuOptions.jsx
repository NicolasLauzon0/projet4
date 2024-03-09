import React from "react";

const MenuOptions = ({
  menu,
  selectedMenu,
  setSelectedMenu,
  setMenuOpen,
  store,
}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return menu.map((item, index) => {
    return (
      <div
        key={index}
        className="menu-item"
        onClick={() => {
          selectedMenu === item ? setSelectedMenu(null) : setSelectedMenu(item);
        }}
      >
        {item.name}
        {selectedMenu === item &&
          item.children.map((child, index) => (
            <div
              key={index}
              className="menu-item"
              onDragStart={(event) => {
                onDragStart(event, child.type);
              }}
              onClick={() => {
                store.createNode(child.type, {
                  x: 250,
                  y: 5,
                });
                setMenuOpen(false);
              }}
              draggable
            >
              {child.name}
            </div>
          ))}
      </div>
    );
  });
};

export default MenuOptions;
