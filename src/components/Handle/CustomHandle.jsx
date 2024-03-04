import { getConnectedEdges, Handle, useNodeId, useStore } from "reactflow";
import { useMemo } from "react";
import { shallow } from "zustand/shallow";

const selector = (store) => ({
  nodeInternals: store.nodeInternals,
  edges: store.edges,
});

const CustomHandle = ({
  type,
  position,
  id,
  nodeType,
  nodeIdProps,
  isConnectable,
}) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectableF = useMemo(() => {
    if (typeof isConnectable === "function") {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);

      return isConnectable({ node, connectedEdges });
    }

    if (typeof isConnectable === "number") {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);

      return connectedEdges.length < isConnectable;
    }

    return isConnectable;
  }, [nodeInternals, edges, nodeId, isConnectable]);

  return (
    <Handle
      type={type}
      position={position}
      id={id}
      isConnectable={isHandleConnectableF}
    />
  );
};
export default CustomHandle;
