export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      style={{
        cursor: 'grab',
        minWidth: '90px',
        height: '42px',
        padding: '0 12px',
        fontSize: '14px',
        backgroundColor: '#1E3A8A', 
        color: '#F9FAFB',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #3B82F6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E3A8A'}
    >
      {label}
    </div>
  );
};
