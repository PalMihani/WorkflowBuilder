import NodeRenderer from '../components/NodeRenderer';

export const nodeTypes = {
  inputnode: (props) => <NodeRenderer {...props} type="InputNode" />,
  outputnode: (props) => <NodeRenderer {...props} type="OutputNode" />,
  textnode: (props) => <NodeRenderer {...props} type="TextNode" />,
  llmnode: (props) => <NodeRenderer {...props} type="LLMNode" />,
  mathnode: (props) => <NodeRenderer {...props} type="MathNode" />,
  jointextnode: (props) => <NodeRenderer {...props} type="JoinTextNode" />,
  switchnode: (props) => <NodeRenderer {...props} type="SwitchNode" />,
  formatnode: (props) => <NodeRenderer {...props} type="FormatNode" />,
  replacetextnode: (props) => <NodeRenderer {...props} type="ReplaceTextNode" />,
};
