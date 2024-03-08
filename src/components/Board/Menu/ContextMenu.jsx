import { useStore } from "../../../store/Store";
import { shallow } from "zustand/shallow";
import { nanoid } from "nanoid";

const selector = (store) => ({
  removeNode: store.removeNode,
  createNodeFromData: (data) => store.createNodeFromData(data),
  nodes: store.nodes,
});

const ContextMenu = ({ id, top, left, right, bottom, children, action }) => {
  const { removeNode, createNodeFromData, nodes } = useStore(selector, shallow);
  return (
    <div
      className="nodrag context-menu"
      style={{
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        zIndex: 1000000,
      }}
    >
      <div className="context-buttons">
        <button
          className="nodrag"
          onClick={(e) => {
            e.preventDefault();
            const node = nodes.find((node) => node.id === id);
            const data = {
              data: node.data,
              type: node.type,
              id: nanoid(),
              position: { x: node.position.x + 100, y: node.position.y + 100 },
            };
            createNodeFromData(data);
            action();
          }}
        >
          Duplicate
        </button>
        <button
          className="nodrag"
          onClick={() => {
            removeNode(id);
            action();
          }}
        >
          Delete
        </button>
        {children}
      </div>
    </div>
  );
};

export default ContextMenu;
