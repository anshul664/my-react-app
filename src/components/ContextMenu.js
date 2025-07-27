import React, { useState, useRef, useEffect } from 'react';

const ContextMenu = ({ x, y, onClose, onDelete, nodeType, nodeId, onRename, currentNodeLabel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(currentNodeLabel || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const handleRename = () => {
    setIsEditing(true);
    setEditValue(currentNodeLabel || '');
  };

  const handleSave = () => {
    if (editValue.trim() && onRename) {
      onRename(nodeId, editValue.trim());
    }
    setIsEditing(false);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      onClose();
    }
  };

  const handleDuplicate = () => {
    // TODO: Implement duplicate functionality
    onClose();
  };

  if (isEditing) {
    return (
      <div
        style={{
          position: 'fixed',
          top: y,
          left: x,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          minWidth: '200px',
          padding: '12px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
          Rename Node
        </div>
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '8px'
          }}
          placeholder="Enter new name..."
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleSave}
            style={{
              padding: '6px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              onClose();
            }}
            style={{
              padding: '6px 12px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: y,
        left: x,
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        minWidth: '150px',
        padding: '8px 0',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        onClick={handleRename}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        ✏️ Rename
      </div>
      
      <div
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        onClick={handleDuplicate}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        📋 Duplicate
      </div>
      
      <div
        style={{
          height: '1px',
          backgroundColor: '#eee',
          margin: '4px 0',
        }}
      />
      
      <div
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#dc3545',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        onClick={handleDelete}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#fff5f5'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        🗑️ Delete
      </div>
    </div>
  );
};

export default ContextMenu; 