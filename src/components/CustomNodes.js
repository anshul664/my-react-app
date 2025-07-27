import React, { memo, useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const CustomRootNode = memo(({ data }) => {
  return (
    <div style={{
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: '#ff6b6b',
      color: 'white',
      border: '2px solid #ff5252',
      minWidth: '120px',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      <Handle type="source" position={Position.Bottom} />
      <div>{data.label}</div>
    </div>
  );
});

const OrgUnitNode = memo(({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data.label);
  const inputRef = useRef(null);

  // Update editValue when data.label changes
  useEffect(() => {
    setEditValue(data.label);
  }, [data.label]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('=== DOUBLE CLICK DETECTED ===');
    console.log('Node ID:', id);
    console.log('Current label:', data.label);
    console.log('onChange function exists:', !!data.onChange);
    setIsEditing(true);
    setEditValue(data.label);
  };

  const handleSave = () => {
    console.log('=== SAVE FUNCTION CALLED ===');
    console.log('Edit value:', editValue);
    
    if (editValue.trim()) {
      console.log('Saving new label:', editValue.trim());
      if (data.onChange) {
        console.log('Calling onChange function...');
        data.onChange(id, editValue.trim());
        console.log('onChange function called successfully');
      } else {
        console.log('ERROR: onChange function not found!');
      }
    } else {
      console.log('No valid value to save');
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(data.label);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setEditValue(newValue);
    // Update the node label in real-time as you type
    if (data.onChange) {
      data.onChange(id, newValue);
    }
  };

  return (
    <div style={{
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: '#4ecdc4',
      color: 'white',
      border: '2px solid #26a69a',
      minWidth: '120px',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={handleInputChange}
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
      ) : (
        <div onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
          {data.label}
        </div>
      )}
    </div>
  );
});

const UserListNode = memo(({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data.label);
  const inputRef = useRef(null);

  // Update editValue when data.label changes
  useEffect(() => {
    setEditValue(data.label);
  }, [data.label]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(data.label);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      console.log('Saving new label:', editValue.trim());
      if (data.onChange) {
        data.onChange(id, editValue.trim());
      } else {
        console.log('onChange function not found!');
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(data.label);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setEditValue(newValue);
    // Update the node label in real-time as you type
    if (data.onChange) {
      data.onChange(id, newValue);
    }
  };

  return (
    <div style={{
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: '#45b7d1',
      color: 'white',
      border: '2px solid #1976d2',
      minWidth: '120px',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      <Handle type="target" position={Position.Top} />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={handleInputChange}
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
      ) : (
        <div onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
          {data.label}
        </div>
      )}
    </div>
  );
});

const CourseListNode = memo(({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data.label);
  const inputRef = useRef(null);

  // Update editValue when data.label changes
  useEffect(() => {
    setEditValue(data.label);
  }, [data.label]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(data.label);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      console.log('Saving new label:', editValue.trim());
      if (data.onChange) {
        data.onChange(id, editValue.trim());
      } else {
        console.log('onChange function not found!');
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(data.label);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setEditValue(newValue);
    // Update the node label in real-time as you type
    if (data.onChange) {
      data.onChange(id, newValue);
    }
  };

  return (
    <div style={{
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: '#96ceb4',
      color: 'white',
      border: '2px solid #4caf50',
      minWidth: '120px',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={handleInputChange}
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
      ) : (
        <div onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
          {data.label}
        </div>
      )}
    </div>
  );
});

export { 
  CustomRootNode, 
  OrgUnitNode, 
  UserListNode, 
  CourseListNode
}; 

export function OptionalCourseStudentListNode({ data, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data.label);
  const inputRef = useRef(null);

  // Update editValue when data.label changes
  useEffect(() => {
    setEditValue(data.label);
  }, [data.label]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(data.label);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      console.log('Saving new label:', editValue.trim());
      if (data.onChange) {
        data.onChange(id, editValue.trim());
      } else {
        console.log('onChange function not found!');
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(data.label);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setEditValue(newValue);
    // Update the node label in real-time as you type
    if (data.onChange) {
      data.onChange(id, newValue);
    }
  };

  return (
    <div style={{
      border: '2px solid purple',
      background: '#f3e6ff',
      borderRadius: 8,
      padding: 10,
      minWidth: 120,
      color: '#6c2eb6',
      fontWeight: 'bold',
      textAlign: 'center',
    }}>
      <Handle type="target" position={Position.Top} />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={handleInputChange}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#6c2eb6',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 'inherit',
            width: '100%',
            outline: 'none'
          }}
        />
      ) : (
        <div onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
          {data.label || 'Optional Course Student List'}
        </div>
      )}
    </div>
  );
} 