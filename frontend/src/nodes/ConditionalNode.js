import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || 'input === "true"');

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '35%' } },
        { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '65%' } }
    ];

    return (
        <BaseNode id={id} data={data} type="Conditional" handles={handles}>
            <div>
                <label>Condition:</label>
                <input
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    style={{ width: 'calc(100% - 20px)' }}
                />
            </div>
        </BaseNode>
    );
};