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
}) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectableF = useMemo(() => {
    // Récupérer le nœud correspondant à l'ID de la poignée
    const sourceNode = nodeInternals.get(nodeId);

    // Vérifier si la poignée est connectée à un autre bord
    const isHandleConnected = edges.some((edge) => {
      if (
        type === "source" &&
        edge.source === nodeId &&
        edge.sourceHandle === id
      ) {
        return true; // La poignée est connectée à un autre bord en tant que source
      }
      if (
        type === "target" &&
        edge.target === nodeId &&
        edge.targetHandle === id
      ) {
        return true; // La poignée est connectée à un autre bord en tant que cible
      }
      return false; // La poignée n'est pas connectée à un autre bord
    });

    // Si la poignée est déjà connectée à un autre bord, retourner false, sinon true
    return !isHandleConnected;
  }, [nodeInternals, edges, nodeId, id, type]);

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
