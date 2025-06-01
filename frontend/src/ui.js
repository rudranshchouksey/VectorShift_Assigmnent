import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { CodeNode } from './nodes/CodeNode';
import { ImageNode } from './nodes/ImageNode';
import { WebhookNode } from './nodes/WebhookNode';
import { ConditionalNode } from './nodes/ConditionalNode';
import { MergeNode } from './nodes/MergeNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
    customInput: InputNode,
    llm: LLMNode,
    customOutput: OutputNode,
    text: TextNode,
    code: CodeNode,
    image: ImageNode,
    webhook: WebhookNode,
    conditional: ConditionalNode,
    merge: MergeNode,
};

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    getNodeID: state.getNodeID,
    addNode: state.addNode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
        nodes,
        edges,
        getNodeID,
        addNode,
        onNodesChange,
        onEdgesChange,
        onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
        let nodeData = { id: nodeID, nodeType: `${type}` };
        if (type === 'code') nodeData.code = '// Write your code here';
        if (type === 'image') nodeData.imageUrl = 'https://via.placeholder.com/150';
        if (type === 'webhook') {
            nodeData.url = 'https://example.com/webhook';
            nodeData.method = 'POST';
        }
        if (type === 'conditional') nodeData.condition = 'input === "yes"';
        if (type === 'merge') nodeData.numInputs = 2;
        if (type === 'customInput') nodeData.inputType = 'File'; // Default to File type as per screenshot
        return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            if (event?.dataTransfer?.getData('application/reactflow')) {
                const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
                const type = appData?.nodeType;

                if (typeof type === 'undefined' || !type) {
                    return;
                }

                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                const nodeID = getNodeID(type);
                const newNode = {
                    id: nodeID,
                    type,
                    position,
                    data: getInitNodeData(nodeID, type),
                };

                addNode(newNode);
            }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
            <div ref={reactFlowWrapper} style={{ width: '100vw', flexGrow: 1 }}> {/* Use flexGrow for remaining height */}
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={setReactFlowInstance}
                    nodeTypes={nodeTypes}
                    proOptions={proOptions}
                    snapGrid={[gridSize, gridSize]}
                    connectionLineType='smoothstep'
                >
                    {/* Darker background for the canvas to blend with overall theme */}
                    <Background color="rgba(255,255,255,0.05)" gap={gridSize} variant="dots" />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </div>
        </>
    )
}