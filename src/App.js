import React, { useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './reactflow-fixes.css';

import { initialNodes, initialEdges } from './data';
import { 
  CustomRootNode, 
  OrgUnitNode, 
  UserListNode, 
  CourseListNode
} from './components/CustomNodes';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import ContextMenu from './components/ContextMenu';
import { useDragAndDrop } from './hooks/useDragAndDrop';

function App() {
  const [contextMenu, setContextMenu] = React.useState(null);
  const [dragData, setDragData] = React.useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeLabelChange = (nodeId, newLabel) => {
    console.log('Updating node label:', nodeId, 'to:', newLabel);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, label: newLabel, onChange: onNodeLabelChange } }
          : node
      )
    );
  };

  // Add onChange function to all nodes except root nodes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.type !== 'root'
          ? {
              ...node,
              data: {
                ...node.data,
                onChange: onNodeLabelChange
              }
            }
          : node
      )
    );
  }, []);

  // Fix ResizeObserver error
  useEffect(() => {
    const resizeObserverError = (e) => {
      if (e.message && e.message.includes('ResizeObserver')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
    };
    
    const unhandledRejection = (e) => {
      if (e.reason && e.reason.message && e.reason.message.includes('ResizeObserver')) {
        e.preventDefault();
        return false;
      }
    };
    
    window.addEventListener('error', resizeObserverError);
    window.addEventListener('unhandledrejection', unhandledRejection);
    
    return () => {
      window.removeEventListener('error', resizeObserverError);
      window.removeEventListener('unhandledrejection', unhandledRejection);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setContextMenu(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onConnect = (params) => {
    const sourceNode = nodes.find((n) => n.id === params.source);
    const targetNode = nodes.find((n) => n.id === params.target);

    if (!sourceNode || !targetNode) return;

    // Rules Enforcement
    if (targetNode.type === 'root') {
      alert("❌ Root node cannot be a child.");
      return;
    }

    // Only prevent multiple parents for nodes that should have only one parent
    // Course List can have multiple parents (not included in this check)
    if ((targetNode.type === 'orgUnit' || targetNode.type === 'userList') &&
        edges.some((e) => e.target === targetNode.id)) {
      alert("❌ Node already has a parent.");
      return;
    }

    if (sourceNode.type === 'userList') {
      alert("❌ User List cannot be a parent.");
      return;
    }

    if (sourceNode.type === 'orgUnit') {
      const siblings = edges
        .filter((e) => e.source === sourceNode.id)
        .map((e) => nodes.find((n) => n.id === e.target));
      const isDuplicate = siblings.some(
        (n) => n?.data?.label === targetNode?.data?.label
      );
      if (isDuplicate) {
        alert("❌ Cannot have children with the same name.");
        return;
      }
    }

    setEdges((eds) => addEdge(params, eds));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    if (!dragData) return;

    const reactFlowBounds = document.querySelector('.react-flow').getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: `${dragData.type}-${Date.now()}`,
      type: dragData.type,
      position,
      data: {
        ...dragData.data,
        onChange: onNodeLabelChange
      },
    };

    setNodes((nds) => nds.concat(newNode));
    setDragData(null);
  };

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      nodeId: node.id,
      nodeType: node.type,
    });
  };

  const onPaneClick = () => {
    setContextMenu(null);
  };

  const deleteNode = () => {
    if (contextMenu) {
      setNodes((nds) => nds.filter((node) => node.id !== contextMenu.nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== contextMenu.nodeId && edge.target !== contextMenu.nodeId));
    }
  };

  const nodeTypes = {
    root: CustomRootNode,
    orgUnit: OrgUnitNode,
    userList: UserListNode,
    courseList: CourseListNode,
  };

  return (
    <ErrorBoundary>
              <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
          <Sidebar onDragStart={setDragData} />
          <div style={{ flex: 1, position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 10,
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            fontSize: '14px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>React Flow Diagram</h3>
            <div style={{ color: '#666', fontSize: '12px' }}>
              <div>• Drag nodes from sidebar to add them</div>
              <div>• Connect nodes by dragging from handles</div>
              <div>• Root (Red) → Org Unit (Teal) → Course List (Green) → User List (Blue)</div>
              <div style={{ marginTop: '10px' }}>
                <button 
                  onClick={() => {
                    const testNode = nodes.find(n => n.type === 'orgUnit');
                    if (testNode) {
                      onNodeLabelChange(testNode.id, 'TEST RENAME ' + Date.now());
                    }
                  }}
                  style={{
                    padding: '5px 10px',
                    fontSize: '12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Test Rename
                </button>
              </div>
            </div>
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragEnd={() => setDragData(null)}
            onNodeContextMenu={onNodeContextMenu}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            minZoom={0.1}
            maxZoom={4}
            preventScrolling={false}
            zoomOnScroll={true}
            panOnScroll={false}
            zoomOnPinch={true}
            panOnDrag={true}
            snapToGrid={true}
            snapGrid={[15, 15]}
            deleteKeyCode="Delete"
            multiSelectionKeyCode="Shift"
            selectionKeyCode="Ctrl"
            onError={(error) => {
              if (error.message && error.message.includes('ResizeObserver')) {
                return; // Ignore ResizeObserver errors
              }
              console.error('React Flow error:', error);
            }}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
          
          {contextMenu && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onClose={() => setContextMenu(null)}
              onDelete={deleteNode}
              nodeType={contextMenu.nodeType}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}


export default App;
// Note: Ensure that the 'data.js' file contains the initialNodes and initialEdges arrays
// with appropriate node types and labels as per your application requirements.
// This code sets up a React Flow diagram with rules for connecting nodes based on their types.
// The rules include restrictions on root nodes, parent-child relationships, and duplicate names.
// Make sure to handle the initial data correctly in 'data.js' to avoid errors.