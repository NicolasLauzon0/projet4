import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getStraightPath,
} from "reactflow";
import { useStore } from "../../../../store/Store.js";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} className="customEdge" />
      <EdgeLabelRenderer>
        <button 
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan deleteEdgeButton"
          onClick={() => {
            useStore.getState().removeEdge(id);
          }}
        >
          Delete
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
