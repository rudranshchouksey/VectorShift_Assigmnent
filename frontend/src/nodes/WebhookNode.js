import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const WebhookNode = ({ id, data }) => {
    const [url, setUrl] = useState(data?.url || '');
    const [method, setMethod] = useState(data?.method || 'POST');

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-payload` },
        { type: 'source', position: Position.Right, id: `${id}-response` }
    ];

    return (
        <BaseNode id={id} data={data} type="Webhook" handles={handles}>
            <div>
                <label>URL:</label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{ width: 'calc(100% - 20px)' }}
                />
                <label>Method:</label>
                <select value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="POST">POST</option>
                    <option value="GET">GET</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>
        </BaseNode>
    );
};