import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ImageNode = ({ id, data }) => {
    const [imageUrl, setImageUrl] = useState(data?.imageUrl || '');

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` }
    ];

    return (
        <BaseNode id={id} data={data} type="Image" handles={handles}>
            <div>
                <label>Image URL:</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={{ width: 'calc(100% - 20px)' }}
                />
                {imageUrl && (
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <img
                            src={imageUrl}
                            alt="preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '120px',
                                objectFit: 'contain',
                                borderRadius: 'var(--border-radius-sm)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        />
                    </div>
                )}
            </div>
        </BaseNode>
    );
};