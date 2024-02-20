import { useCallback } from "react"
import { Handle, Position } from "reactflow"

const handleStyle = { left: 10 }
const Sample = () => {

  return (
    <>
      <Handle type="target" position={Position.Top} id="1" />
      <Handle type="target" position={Position.Top} id="2" style={handleStyle}/>

      <div>
        <label>Sample</label>
        <input
          type="text"
          style={handleStyle}
          className="nodrag"
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  )
}

export default Sample