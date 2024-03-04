import { getConnectedEdges, Handle, useNodeId, useStore } from "reactflow";
import { useMemo } from "react";
import { shallow } from "zustand/shallow";


const CustomHandle = ({ type, position, id }) => {

  return (
    <Handle
      type={type}
      position={position}
      id={id}
    />
  );
};

export default CustomHandle;
