import { DraggableNode } from './draggableNode';
import React, { useState } from 'react'; // Import useState

export const PipelineToolbar = () => {
    const [activeTab, setActiveTab] = useState('All'); // State for active tab

    const categories = ['All', 'LLMs', 'Multimodal', 'Data', 'VectorDB', 'Logic', 'Chat'];

    return (
        <div style={{
            backgroundColor: 'var(--toolbar-bg-color)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '15px 40px 0px 40px', /* Adjusted padding */
            boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
            zIndex: 100, /* Ensure it's above canvas */
            position: 'relative'
        }}>
            <h1 style={{
                color: 'var(--node-text-color)',
                fontFamily: "'Orbitron', sans-serif", /* Funky font for title */
                fontSize: '24px',
                fontWeight: '600',
                margin: '0 0 15px 0',
                textShadow: '0 0 10px rgba(138, 43, 226, 0.4)' /* Subtle glow */
            }}>
                Build Pipeline
            </h1>

            {/* Category Tabs */}
            <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '5px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)' /* Subtle separator for tabs */
            }}>
                {categories.map((category) => (
                    <div
                        key={category}
                        onClick={() => setActiveTab(category)}
                        style={{
                            padding: '10px 20px',
                            cursor: 'pointer',
                            color: activeTab === category ? 'var(--toolbar-tab-active-text)' : 'var(--toolbar-tab-text)',
                            backgroundColor: activeTab === category ? 'var(--toolbar-tab-active-bg)' : 'transparent',
                            borderRadius: 'var(--border-radius-sm) var(--border-radius-sm) 0 0',
                            fontWeight: activeTab === category ? '600' : '500',
                            transition: 'all 0.2s ease',
                            border: activeTab === category ? '1px solid var(--node-border-color)' : '1px solid transparent',
                            borderBottom: 'none',
                        }}
                    >
                        {category}
                    </div>
                ))}
            </div>

            {/* Draggable Nodes Section (optional, can be moved to a sidebar) */}
            {/* For now, keeping it here for simplicity, but visually it looks like a sidebar in the image */}
            {/* If you want to make it a sidebar, you'll need to change App.js layout (flex row) */}
            {/* Keeping it simple for now, as the image shows nodes directly below the header */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                maxWidth: '1920px',
                width: '100%',
                height: '100px', // Adjust height as needed
                justifyContent: 'center',
                paddingBottom: '20px' // Added padding to separate from tabs
            }}>
                {/* You might want to filter nodes based on activeTab here */}
                {/* For demonstration, displaying all nodes */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='code' label='Code' />
                <DraggableNode type='image' label='Image' />
                <DraggableNode type='webhook' label='Webhook' />
                <DraggableNode type='conditional' label='Conditional' />
                <DraggableNode type='merge' label='Merge' />
            </div>
        </div>
    );
};