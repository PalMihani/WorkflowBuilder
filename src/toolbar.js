import { DraggableNode } from './draggableNode';
import { nodeConfigs } from './nodes/NodeConfigs';

export const PipelineToolbar = () => {
  return (
    <div style={{
      padding: '12px',
      background: 'linear-gradient(90deg, #8ec5fc 0%, #e0c3fc 100%)',
      borderBottom: '1px solid #D1D5DB',
    }}>
      <div style={{
        marginTop: '8px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center'
      }}>
        {Object.entries(nodeConfigs).map(([nodeKey, config]) => (
          <DraggableNode
            key={nodeKey}
            type={nodeKey.toLowerCase()}
            label={config.title || nodeKey}
          />
        ))}
      </div>
    </div>
  );
};
