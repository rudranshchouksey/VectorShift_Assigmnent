export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
        const appData = { nodeType }
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className={type}
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.target.style.cursor = 'grab')}
            style={{
                cursor: 'grab',
                minWidth: '120px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 'var(--border-radius-md)',
                backgroundColor: 'var(--node-bg-color)', /* Dark node background */
                justifyContent: 'center',
                flexDirection: 'column',
                color: 'var(--node-text-color)', /* Light text */
                fontWeight: '600',
                fontSize: '15px',
                boxShadow: 'var(--shadow-node)', /* Node shadow */
                border: '1px solid var(--node-border-color)', /* Subtle border */
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = 'var(--shadow-node-hover)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'var(--shadow-node)';
            }}
            draggable
        >
            <span>{label}</span>
        </div>
    );
};