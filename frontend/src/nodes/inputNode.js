import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
    const [inputType, setInputType] = useState(data.inputType || 'File'); // Default to File as per screenshot

    const handles = [
        { type: 'source', position: Position.Right, id: `${id}-value` }
    ];

    return (
        <BaseNode id={id} data={data} type="Input" handles={handles}>
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
                <select value={inputType} onChange={(e) => {
                    setInputType(e.target.value);
                }}>
                    <option value="Text">Text</option>
                    <option value="File">File</option>
                </select>
                {/* Specific elements for "File" and "Upload File" as seen in screenshot */}
                {inputType === 'File' && (
                    <>
                        <div className="node-input-label">File</div>
                        <div className="node-action-text" onClick={() => alert('Simulating file upload...')}>
                            Upload file
                        </div>
                    </>
                )}
            </div>
        </BaseNode>
    );
}