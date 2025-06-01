import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `35%` } },
        { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `65%` } },
        { type: 'source', position: Position.Right, id: `${id}-response` }
    ];

    return (
        <BaseNode id={id} data={data} type="LLM" handles={handles}>
            <div style={{ textAlign: 'center', color: 'var(--toolbar-tab-text)', fontSize: '13px' }}>
                <span>Connect inputs for System and Prompt.</span>
            </div>
        </BaseNode>
    );
}