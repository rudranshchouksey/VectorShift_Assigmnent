import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const CodeNode = ({ id, data }) => {
    const [code, setCode] = useState(data?.code || 'console.log("Hello, World!");');

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` }
    ];

    return (
        <BaseNode id={id} data={data} type="Code" handles={handles}>
            <div>
                <label>Code:</label>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    style={{ width: 'calc(100% - 20px)', minHeight: '80px' }}
                />
            </div>
        </BaseNode>
    );
};