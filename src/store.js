import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges } from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node]
    })),

  setNodes: (updater) =>
    set((state) => ({
      nodes: typeof updater === 'function' ? updater(state.nodes) : updater
    })),

  getNodeID: (type) => `${type}-${Date.now()}`,

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes)
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges)
    })),

  onConnect: (connection) =>
    set((state) => ({
      edges: [...state.edges, { ...connection, id: `${Date.now()}` }]
    })),
}));
