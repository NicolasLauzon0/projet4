import { useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap, Panel } from "reactflow";
import { useStore } from "../../store/Store";
import { shallow } from "zustand/shallow";
import LoginAccueilNode from "../Connexion/LoginAccueilNode";

const selector = (store) => ({
    nodes: store.authNodes,
    edges: store.authEdges,
    onNodesChange: store.onAuthNodesChange,
    onEdgesChange: store.onAuthEdgesChange,
    onConnect: store.onAuthConnect
});

const nodeTypes = {
    login: LoginAccueilNode
};

import "reactflow/dist/style.css";
import { useAuth } from "../../context/AuthContext";
const FlowAuth = () => {
    const store = useStore(selector, shallow);
    const { signIn, user, logOut } = useAuth();


    const connect = useCallback(
        (params) => {
            user === null ? signIn() : logOut()
        }, []
    );
    return (
        <>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={store.nodes}
                edges={store.edges}
                onNodesChange={store.onNodesChange}
                onConnect={(params) => connect(params) && store.onConnect(params)}
                onEdgesChange={store.onEdgesChange}
                fitView
                className='flow'
                deleteKeyCode={[]}
                panOnDrag={false}
                draggable={false}
                zoomOnScroll={false}
            >
                <Background
                    color="var(--blanc)"
                    gap={32}
                    size={3}
                    style={{
                        borderRadius: "5px",
                        backgroundColor: "#222222",
                        padding: "0",
                        zoom: "1",
                    }}

                />
            </ReactFlow>
        </>
    )
}

export default FlowAuth