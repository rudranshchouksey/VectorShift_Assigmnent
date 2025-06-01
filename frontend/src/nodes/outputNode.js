import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
    const [outputType, setOutputType] = useState(data.outputType || 'Text');

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-value` }
    ];

    return (
        <BaseNode id={id} data={data} type="Output" handles={handles}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={currName}
                    onChange={(e) => {
                        setCurrName(e.target.value);
                    }}
                />
                <label>Type:</label>
                <select value={outputType} onChange={(e) => {
                    setOutputType(e.target.value);
                }}>
                    <option value="Text">Text</option>
                    <option value="File">Image</option>
                </select>
            </div>
        </BaseNode>
    );
}