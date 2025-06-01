import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, type, children, handles }) => {
    return (
        <div style={{
            minWidth: 240, /* Wider nodes */
            minHeight: 100,
            border: '1px solid var(--node-border-color)', /* Subtle border */
            borderRadius: 'var(--border-radius-lg)', /* Very rounded corners */
            backgroundColor: 'var(--node-bg-color)', /* Dark node background */
            boxShadow: 'var(--shadow-node)', /* Deep shadow/glow */
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: 'var(--node-text-color)', /* Light text */
            overflow: 'hidden',
            transition: 'all 0.2s ease', /* Smooth transitions on hover */
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-node-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-node)'}
        >
            <div style={{
                backgroundColor: 'var(--node-header-bg)', /* Slightly different dark header */
                color: 'var(--node-text-color)',
                padding: '10px 20px',
                fontWeight: '600',
                fontSize: '16px',
                borderTopLeftRadius: 'var(--border-radius-lg)',
                borderTopRightRadius: 'var(--border-radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                letterSpacing: '0.5px', /* Slightly spaced for header */
            }}>
                <span>{type}</span>
            </div>
            <div style={{
                flexGrow: 1,
                padding: '15px 20px', /* More internal padding */
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
            }}>
                {children}
            </div>
            {handles && handles.map((handle, index) => (
                <Handle
                    key={index}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id}
                    style={{
                        ...handle.style,
                        background: 'var(--handle-bg-color)', /* Accent color handles */
                        border: '2px solid var(--handle-border-color)', /* White border */
                        width: '18px', /* Larger handles */
                        height: '18px',
                        cursor: 'grab',
                        boxShadow: 'var(--shadow-handle-glow)', /* Glowing handles */
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.5)';
                        e.currentTarget.style.boxShadow = '0 0 15px var(--accent-color), 0 0 25px var(--accent-color)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-handle-glow)';
                    }}
                />
            ))}
        </div>
    );
};