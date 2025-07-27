import React from 'react';

const Sidebar = ({ onDragStart }) => {
  const handleDragStart = (event, nodeType, nodeData) => {
    // Set drag data in parent component
    onDragStart({ type: nodeType, data: nodeData });
    
    // Set drag data in dataTransfer for visual feedback
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', ''); // Required for some browsers
    }
  };

  const nodeTypes = [
    {
      type: 'root',
      label: 'Root Node',
      color: '#ff6b6b',
      description: 'Can only be a parent'
    },
    {
      type: 'orgUnit',
      label: 'Org Unit',
      color: '#4ecdc4',
      description: 'Can be parent or child'
    },
    {
      type: 'userList',
      label: 'User List',
      color: '#45b7d1',
      description: 'Can only be a child'
    },
    {
      type: 'courseList',
      label: 'Course List',
      color: '#96ceb4',
      description: 'Can be parent or child'
    },
    {
      type: 'optionalCourseStudentList',
      label: 'Optional Course Student List',
      color: '#a259e6',
      description: 'Can only be a child (can have multiple parents)'
    }
  ];

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      borderRight: '1px solid #dee2e6',
      padding: '20px',
      boxSizing: 'border-box',
      overflowY: 'auto'
    }}>
      <h3 style={{
        margin: '0 0 20px 0',
        color: '#333',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Node Types
      </h3>
      
      <div style={{ marginBottom: '20px' }}>
        <p style={{
          fontSize: '14px',
          color: '#666',
          margin: '0 0 15px 0',
          lineHeight: '1.4'
        }}>
          Drag nodes from here onto the canvas to add them to your diagram.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            style={{
              padding: '12px',
              backgroundColor: 'white',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              cursor: 'grab',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
            onDragStart={(e) => handleDragStart(e, nodeType.type, { label: nodeType.label })}
            draggable
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '8px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: nodeType.color,
                flexShrink: 0
              }} />
              <span style={{
                fontWeight: '600',
                color: '#333',
                fontSize: '14px'
              }}>
                {nodeType.label}
              </span>
            </div>
            <p style={{
              fontSize: '12px',
              color: '#666',
              margin: 0,
              lineHeight: '1.3'
            }}>
              {nodeType.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        border: '1px solid #bbdefb'
      }}>
        <h4 style={{
          margin: '0 0 10px 0',
          color: '#1976d2',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          💡 Tips
        </h4>
        <ul style={{
          margin: 0,
          paddingLeft: '20px',
          fontSize: '12px',
          color: '#1976d2',
          lineHeight: '1.4'
        }}>
          <li>Drag nodes to reposition them</li>
          <li>Connect nodes using the handles</li>
          <li>Use the controls to zoom and pan</li>
          <li>Right-click nodes for more options</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar; 