import { Handle, getConnectedEdges, useNodeId } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/Store.js";
import { useEffect, useMemo } from "react";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
});

const CustomHandle = ({ type, position, isConnectable, id }) => {
  const { nodes, edges } = useStore(selector, shallow);
  const nodeId = useNodeId();

  const handleConnect = useMemo(() => {
    if (!isConnectable) return;
    if (typeof isConnectable === "function") {
      const node = nodes.find((node) => node.id === nodeId);
      if (!node) return false; // Exit if node is not found
      const connectedEdges = getConnectedEdges([node], edges);
      return isConnectable({ node, connectedEdges });
    } else if (typeof isConnectable === "number") {
      const node = nodes.find((node) => node.id === nodeId);
      if (!node) return false; // Exit if node is not found
      const connectedEdges = getConnectedEdges([node], edges);
      return connectedEdges.length < isConnectable;
    } else {
      return isConnectable;
    }
  }, [nodes, edges, nodeId, isConnectable]);

  return (
    <Handle
      type={type}
      position={position}
      isConnectable={handleConnect}
      id={id}
    />
  );
};


export default CustomHandle;
