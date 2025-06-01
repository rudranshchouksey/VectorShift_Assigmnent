import { useStore } from './store'; // Import useStore to access nodes and edges

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        const pipelineData = {
            nodes: nodes,
            edges: edges
        };

        try {
            const response = await fetch('/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `pipeline=${encodeURIComponent(JSON.stringify(pipelineData))}`,
            });
            const result = await response.json();
            alert(`Pipeline Info:\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nIs DAG: ${result.is_dag}`);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to submit pipeline. Check console for details.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px', /* Increased padding */
            backgroundColor: 'rgba(0,0,0,0.2)', /* Semi-transparent background */
            borderTop: '1px solid rgba(255,255,255,0.05)', /* Subtle separator */
            boxShadow: '0 -5px 15px rgba(0,0,0,0.4)', /* Shadow pointing upwards */
            zIndex: 99, /* Below toolbar */
            position: 'relative'
        }}>
            <button
                onClick={handleSubmit}
                style={{
                    padding: '15px 35px', /* Larger button */
                    fontSize: '18px',
                    fontWeight: '600',
                    backgroundColor: 'var(--submit-btn-bg)', /* Dark button color */
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--border-radius-lg)', /* Very rounded */
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-button-glow)', /* Initial glow */
                    transition: 'all 0.3s ease',
                    letterSpacing: '1px', /* Slightly spaced text */
                    fontFamily: "'Orbitron', sans-serif", /* Funky font */
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--submit-btn-hover-bg)';
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 0 25px var(--accent-color), 0 0 40px var(--accent-color)'; /* More intense glow */
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--submit-btn-bg)';
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'var(--shadow-button-glow)';
                }}
                onMouseDown={(e) => {
                    e.target.style.transform = 'scale(0.98)';
                    e.target.style.boxShadow = 'none';
                }}
                onMouseUp={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 0 25px var(--accent-color), 0 0 40px var(--accent-color)';
                }}
            >
                🚀 Submit Pipeline
            </button>
        </div>
    );
};