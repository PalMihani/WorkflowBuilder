import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const extractVariables = (text) => {
  const regex = /{{\s*([\w\d_]+)\s*}}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return Array.from(vars);
};

const NodeRenderer = ({ id, data = {}, type }) => {
  const [state, setState] = useState(data);
  const [isHovered, setHovered] = useState(false);
  const [dynamicInputs, setDynamicInputs] = useState([]);

  useEffect(() => {
    if (type === 'TextNode') {
      const rawText = state.content || '';
      const vars = extractVariables(rawText);
      setDynamicInputs(vars);
    }
  }, [state.content, type]);

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, [key]: value }));
  };

const nodeStyles = {
  backgroundColor: '#fff',
  border: isHovered ? '2px solid #3B82F6' : '1px solid #E5E7EB',
  borderRadius: 12,
  padding: 12,
  minWidth: 240,
  maxWidth: 280,
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  boxShadow: isHovered ? '0 4px 12px rgba(59,130,246,0.3)' : '0 2px 6px rgba(0,0,0,0.05)',
  fontFamily: 'Inter, sans-serif',
  position: 'relative',
  color: '#111827',
  zIndex: isHovered ? 10 : 1,
};


const fieldStyle = {
  width: '100%',
  maxWidth: '100%',
  padding: '6px 10px',
  border: '1px solid #ccc',
  borderRadius: 6,
  fontSize: 13,
  marginBottom: 10,
  boxSizing: 'border-box',
};


  const label = (text) => (
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{text}</div>
  );

  const deleteButton = (
    <button
      onClick={() => {
        const event = new CustomEvent('deleteNode', { detail: id });
        window.dispatchEvent(event);
      }}
      style={{
        position: 'absolute',
        top: 6,
        right: 6,
        background: 'transparent',
        border: 'none',
        color: '#888',
        fontWeight: 'bold',
        fontSize: 18,
        cursor: 'pointer',
      }}
      title="Delete"
    >
      ×
    </button>
  );

  const renderHandles = (arr, type, position) =>
    arr?.map((key, i) => (
      <Handle
        key={`${type}-${key}`}
        type={type}
        id={key}
        position={position}
        style={{ top: 40 + i * 20 }}
      />
    ));

  switch (type) {
    case 'InputNode':
      return (
        <div style={nodeStyles} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {deleteButton}
          {label('Input')}
          <input
            value={state.inputName || ''}
            onChange={handleChange('inputName')}
            style={fieldStyle}
            placeholder="Input name"
          />
          <select value={state.inputType || 'Text'} onChange={handleChange('inputType')} style={fieldStyle}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
          {renderHandles(['value'], 'source', Position.Right)}
        </div>
      );

    case 'OutputNode':
      return (
        <div style={nodeStyles} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {deleteButton}
          {label('Output')}
          {renderHandles(['value'], 'target', Position.Left)}
        </div>
      );

    case 'TextNode':
      return (
        <div style={nodeStyles} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {deleteButton}
          {label('Text')}
          <textarea
            value={state.content || ''}
            onChange={(e) => {
              const val = e.target.value;
              setState((prev) => ({ ...prev, content: val }));
              setDynamicInputs(extractVariables(val));
            }}
            style={{
              ...fieldStyle,
              height: 100,
              fontFamily: 'monospace',
              fontSize: 13,
              resize: 'none',
            }}
          />
          {renderHandles(dynamicInputs, 'target', Position.Left)}
          {renderHandles(['result'], 'source', Position.Right)}
        </div>
      );

    case 'LLMNode':
      return (
        <div style={nodeStyles} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {deleteButton}
          {label('LLM')}
          <textarea
            value={state.prompt || ''}
            onChange={handleChange('prompt')}
            style={{ ...fieldStyle, height: 80 }}
          />
          {renderHandles(['input'], 'target', Position.Left)}
          {renderHandles(['response'], 'source', Position.Right)}
        </div>
      );

    case 'MathNode':
      return (
        <div style={nodeStyles} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {deleteButton}
          {label('Math (Add)')}
          <input type="number" value={state.num1 || ''} onChange={handleChange('num1')} style={fieldStyle} placeholder="Number 1" />
          <input type="number" value={state.num2 || ''} onChange={handleChange('num2')} style={fieldStyle} placeholder="Number 2" />
          {renderHandles(['num1', 'num2'], 'target', Position.Left)}
          {renderHandles(['sum'], 'source', Position.Right)}
        </div>
      );

    case 'JoinTextNode':
      return (
        <div style={nodeStyles} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {deleteButton}
          {label('Join Text')}
          <input value={state.separator || ''} onChange={handleChange('separator')} style={fieldStyle} placeholder="Separator (optional)" />
          {renderHandles(['a', 'b'], 'target', Position.Left)}
          {renderHandles(['result'], 'source', Position.Right)}
        </div>
      );

    case 'SwitchNode':
      return (
        <div style={nodeStyles} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {deleteButton}
          {label('Switch')}
          <select value={state.condition || 'true'} onChange={handleChange('condition')} style={fieldStyle}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {renderHandles(['condition'], 'target', Position.Left)}
          {renderHandles(['ifTrue', 'ifFalse'], 'source', Position.Right)}
        </div>
      );

    case 'FormatNode':
      return (
        <div style={nodeStyles} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {deleteButton}
          {label('Format Text')}
          <select value={state.format || 'UPPER'} onChange={handleChange('format')} style={fieldStyle}>
            <option value="UPPER">UPPER</option>
            <option value="lower">lower</option>
            <option value="Title">Title</option>
          </select>
          {renderHandles(['text'], 'target', Position.Left)}
          {renderHandles(['formatted'], 'source', Position.Right)}
        </div>
      );

    case 'ReplaceTextNode':
      return (
        <div style={nodeStyles} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {deleteButton}
          {label('Replace Text')}
          <input value={state.find || ''} onChange={handleChange('find')} style={fieldStyle} placeholder="Find" />
          <input value={state.replaceWith || ''} onChange={handleChange('replaceWith')} style={fieldStyle} placeholder="Replace With" />
          {renderHandles(['text', 'find', 'replaceWith'], 'target', Position.Left)}
          {renderHandles(['result'], 'source', Position.Right)}
        </div>
      );

    default:
      return <div style={nodeStyles}>Unknown node type: {type}</div>;
  }
};

export default NodeRenderer;
