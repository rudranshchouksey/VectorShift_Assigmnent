import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data, selected }) => {
    const [currText, setCurrText] = useState(data?.text || 'Reads data from a File'); // Updated default text
    const [dynamicHandles, setDynamicHandles] = useState([]);
    const textAreaRef = useRef(null);

    const updateNodeSize = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        updateNodeSize();
    }, [currText]);

    useEffect(() => {
        updateNodeSize();
    }, [selected]);


    const handleTextChange = (e) => {
        const newText = e.target.value;
        setCurrText(newText);
        
        const variableRegex = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;
        let matches = [];
        let match;
        while ((match = variableRegex.exec(newText)) !== null) {
            if (!matches.includes(match[1])) {
                matches.push(match[1]);
            }
        }

        const newHandles = matches.map((variable, index) => ({
            type: 'target',
            position: Position.Left,
            id: `${id}-var-${variable}`,
            style: { top: `${30 + (index * 25)}px` }
        }));
        setDynamicHandles(newHandles);
    };

    const handles = [
        ...dynamicHandles,
        { type: 'source', position: Position.Right, id: `${id}-output` }
    ];

    return (
        <BaseNode id={id} data={data} type="Text" handles={handles}>
            <div>
                <label>Content:</label>
                <textarea
                    ref={textAreaRef}
                    value={currText}
                    onChange={handleTextChange}
                    style={{
                        width: 'calc(100% - 20px)',
                        minHeight: '60px',
                        resize: 'vertical',
                        overflowY: 'hidden'
                    }}
                />
            </div>
        </BaseNode>
    );
}