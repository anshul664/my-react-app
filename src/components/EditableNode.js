import React, { useState, useRef, useEffect } from 'react';

const EditableNode = ({ children, value, onSave, disabled = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = (e) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    setEditValue(value);
  };

  const handleSave = () => {
    if (editValue.trim() && editValue.trim() !== value) {
      onSave(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 'inherit',
          width: '100%',
          outline: 'none'
        }}
      />
    );
  }

  return (
    <div 
      onDoubleClick={handleDoubleClick}
      onMouseDown={(e) => e.stopPropagation()}
      style={{ 
        cursor: disabled ? 'default' : 'pointer', 
        userSelect: 'none',
        pointerEvents: disabled ? 'none' : 'auto'
      }}
    >
      {children}
    </div>
  );
};

export default EditableNode; 