import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
    const [numInputs, setNumInputs] = useState(data?.numInputs || 2);

    const handles = [];
    for (let i = 0; i < numInputs; i++) {
        handles.push({
            type: 'target',
            position: Position.Left,
            id: `${id}-input-${i}`,
            style: { top: `${25 + (i * (50 / (numInputs > 0 ? numInputs : 1)))}%` }
        });
    }
    handles.push({ type: 'source', position: Position.Right, id: `${id}-output` });

    return (
        <BaseNode id={id} data={data} type="Merge" handles={handles}>
            <div>
                <label>Number of Inputs:</label>
                <input
                    type="number"
                    value={numInputs}
                    onChange={(e) => setNumInputs(parseInt(e.target.value) || 1)}
                    min="1"
                    style={{ width: 'calc(100% - 20px)' }}
                />
            </div>
        </BaseNode>
    );
};