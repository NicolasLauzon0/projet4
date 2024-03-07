import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getStraightPath,
} from "reactflow";
import { useStore } from "../../store/Store";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  console.log("CustomEdge", id, sourceX, sourceY, targetX, targetY);
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge 
      id={id}
       path={edgePath} 
       className="customEdge"
       interactionWidth={ 60}
       />
      <EdgeLabelRenderer>
        <svg
          onClick={() => {
            useStore.getState().removeEdge(id);
          }}
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
            cursor: "pointer",
            width: "60px",
          }}
          className={"edgeTrash nopan nodrag"}
          width="458"
          height="500"
          viewBox="0 0 458 500"
          fill="var(--noir)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M47 108H410V421C410 464.63 374.63 500 331 500H126C82.3695 500 47 464.63 47 421V108Z"
            fill="var(--noir)"
          />
          <path d="M25 111L53.1189 436H405.5L433 111H25Z" fill="var(--noir)" />
          <path
            d="M25 114.5H433"
            stroke="var(--noir)"
            strokeWidth={49}
            strokeLinecap="round"
          />
          <path
            d="M177.5 378.5V217M279.5 378.5V217"
            stroke="var(--blanc)"
            strokeWidth={49}
            strokeLinecap="round"
          />
          <path
            d="M119.001 108C119.001 25 117.501 25 227.001 25C336.501 25 336.501 25 336.501 108"
            stroke="var(--noir)"
            strokeWidth={49}
            strokeLinecap="round"
          />
        </svg>
      </EdgeLabelRenderer>
    </>
  );
}
